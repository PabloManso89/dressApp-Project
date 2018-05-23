import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/if';

import { User } from '../models/User';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { find } from 'lodash';

import { Constants } from '../utils/constants';

@Injectable()
export class UsersService {
  emailRegex = /[^\s]*@[a-z0-9.-]*\.[a-z]{1,3}/i;

  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userObservable: Observable<User>;
  loggedUser: User;

  constructor(
    public afs: AngularFirestore
  ) {
    // TODO move this to node
    this.userCollection = this.afs.collection(Constants.USER_COLLECTION);
  }
  public getUserById(email: string): Observable<User> {
    if (this.loggedUser === undefined) {
      this.userObservable = this.userCollection.doc(email).snapshotChanges().map(a => {
        const data = a.payload.data() as User;
        this.loggedUser = data as User;
        this.loggedUser.email = email;
        data.id = a.payload.id;
        return data;
      });
    }
    return this.userObservable;
  }

  getUsers(): Observable<User[]> {
    return this.users = this.userCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      })
    });
  }

  isValidUser(email: string, password: string): Observable<boolean> {
    return this.getUserById(email).mergeMap((user) => {
      return Observable.if(() => {return user.password === password; }, Observable.of(true), Observable.of(false));
    });
  }

  getLoggedUser(): User {
    return this.loggedUser;
  }

  isThereLoggedUser(): boolean {
    return this.loggedUser !== undefined && this.loggedUser.email !== undefined && this.loggedUser.password !== undefined;
  }

}
