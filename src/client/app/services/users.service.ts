import { Injectable } from '@angular/core';
import { Observable, of as _of} from 'rxjs';
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

  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userObservable: Observable<User>;
  loggedUser: User;

  constructor(
    public afs: AngularFirestore,
    private sessionService: SessionService,
    private router: Router
  ) {
    // TODO move this to node
    this.userCollection = this.afs.collection(Constants.USER_COLLECTION);
  }
  public getUserById(email: string): Observable<User> {
    if (this.loggedUser === undefined) {

      this.userObservable = this.userCollection.doc(email).snapshotChanges().pipe(map(a => {
        const data = a.payload.data() as User;
        if (data) {
          this.loggedUser = data as User;
          this.loggedUser.email = email;
          data.id = a.payload.id;
          this.sessionService.setNewSession(this.loggedUser);
        }
        return data;
      }));
    }
    return this.userObservable;
  }

  getUsers(): Observable<User[]> {
    return this.users = this.userCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  isValidUser(email: string, password: string): Observable<boolean> {
    return this.getUserById(email).pipe(mergeMap((user) => {
      if (!user) { return _of(false); }
      return user.password === password ? _of(true) : _of(false);
    }));
  }

  getLoggedUser(): User {
    return this.loggedUser;
  }

  isThereLoggedUser(): boolean {
    const loggedUser = this.sessionService.getLoggedUser();
    return loggedUser && loggedUser.email !== undefined && loggedUser.password !== undefined;
  }

  logOutUser() {
    this.sessionService.removeUser();
    this.loggedUser = undefined;
    this.router.navigate(['login']);
  }

}
