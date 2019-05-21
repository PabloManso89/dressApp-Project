import { Injectable } from '@angular/core';
import { Observable, of as _of, Subject} from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { User } from '../models/User';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { find } from 'lodash';

import { Constants } from '../utils/constants';
import {SessionService} from './session.service';
import {Router} from '@angular/router';

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
  private _getUserById(email: string): Observable<User> {
    const result$ = new Subject<User>();
    if (!this.loggedUser) {
      this.userCollection.doc(email).get().subscribe((user: any) => {
        result$.next(user.exists ? user.data() : undefined);
      });
    }
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

  public isValidUser(email: string, password: string): Observable<boolean> {
    return this._getUserById(email).pipe(mergeMap((user) => {
      if (!user) { return _of(false); }
      return user.password === password ? _of(true) : _of(false);
    }));
  }

  public getLoggedUser(): User {
    return this.loggedUser;
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
  public registerNewUser(newUser: User): Observable<boolean> {
    const result$ = new Subject<boolean>();

    // There are two ways of adding data to the database:
    // 1. Using 'collection.doc(docName).set({}, {merge: boolean})' --> If there is not document with that docName,
    // a new one is created, otherwise it is overwritten. This alternative does not return a promise.

    // 2. Using 'collection.add()' --> With this way you can handle a promise that returns the automatically assigned ID,
    // however you can not choose the name of the document.

    this.userCollection.doc(newUser.email).get().subscribe((user: any) => {
      if (!user.exists) {
        this.userCollection.doc(newUser.email).set(
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
          result$.next(true);
        })
      } else {
        alert('The user already exists');
        result$.next(false);
      }
    });
    return result$;
  }
}
