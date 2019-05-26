import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { User } from '../models/User';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot} from '@angular/fire/firestore';
import { find } from 'lodash';

import {COMPARISON_SYMBOLS, Constants, RESULT_MESSAGES, RESULT_VALUES} from '../utils/constants';
import {SessionService} from './session.service';
import {Router} from '@angular/router';
import {ComparisonSymbols, resultTypes} from '../utils/types';

@Injectable()
export class UsersService {
  emailRegex = /[^\s]*@[a-z0-9.-]*\.[a-z]{1,3}/i;

  public userCollection: AngularFirestoreCollection<User>;
  public users: Observable<User[]>;
  public userObservable: Observable<User>;
  public loggedUser: User;

  public constructor(
    public afs: AngularFirestore,
    private sessionService: SessionService,
    private router: Router
  ) {
    // TODO move this to node
    this.userCollection = this.afs.collection(Constants.USER_COLLECTION);
  }

  // MANAGE EXISTING USERS
  public getUserById(email: string): Observable<User> {
    const result$ = new Subject<User>();
    if (!this.loggedUser) {
      this.userCollection.doc(email).get().subscribe((user: any) => {
        result$.next(user.exists ? user.data() : undefined);
      });
    }
    return result$;
  }

  private _getUserByProperty(property: string, comparasionSymbol: string, comparisonValue: any, limit?: number): Observable<User[]> {
    // By default, Cloud Firestore retrieves all documents that satisfy the query in ascending order by document ID,
    // but you can order and limit the data returned.
    const result$ = new Subject<User[]>();
    this.userCollection.ref.where(property, comparasionSymbol as ComparisonSymbols, comparisonValue)
      .limit(limit)
      .get()
      .then((user: any) => {
      if (user.empty) {
        result$.error(RESULT_MESSAGES.NON_FOUND_USER);
      } else {
        result$.next(user.docs);
      }
    });
    return result$;
  }

  // TODO refactor
  public getUsers(): Observable<User[]> {
    return this.users = this.userCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  public isRegisteredUser(email: string, password: string): Observable<User|resultTypes> {
    const result$ = new Subject<User|resultTypes>();
    this._getUserByProperty('email', COMPARISON_SYMBOLS.EQUALS, email, 1)
    .subscribe(
      (doc: any) => {
        result$.next(doc[0].data().password === password ? doc[0].data() : RESULT_VALUES.INVALID_PASSWORD);
      }, error => result$.error(error)
    );
    return result$;
  }

  public isThereLoggedUser(): boolean {
    const loggedUser = this.sessionService.getLoggedUser();
    return loggedUser && loggedUser.email !== undefined && loggedUser.password !== undefined;
  }

  public logOutUser() {
    this.sessionService.removeUser();
    this.loggedUser = undefined;
    this.router.navigate(['login']);
  }

  // REGISTER A NEW USER
  public registerNewUser(newUser: User): Observable<resultTypes> {
    const result$ = new Subject<resultTypes>();

    // There are two ways of adding data to the database:
    // 1. Using 'collection.doc(docName).set({}, {merge: boolean})' --> If there is not document with that docName,
    // a new one is created, otherwise it is overwritten.

    // 2. Using 'collection.add()' --> With this way you can handle a promise that returns the automatically assigned ID,
    // however you can not choose the name of the document.

    this.userCollection.doc(newUser.email).get().subscribe((user: any) => {
      if (!user.exists) {
        this.userCollection.add(
          {
            name: newUser.name,
            email: newUser.email.toLocaleLowerCase(),
            password: newUser.password.toLocaleLowerCase(),
            age: +newUser.age,
            gender: newUser.gender,
            registrationDate: new Date(),
          }
        ).then((data: any) => {
          console.log(data);
          result$.next(RESULT_VALUES.USER_SUCCESSFULLY_REGISTERED as resultTypes);
        })
      } else {
        result$.next(RESULT_VALUES.USER_ALREADY_REGISTERED as resultTypes);
      }
    });
    return result$;
  }
}
