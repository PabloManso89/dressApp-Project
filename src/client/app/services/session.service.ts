import {Injectable} from '@angular/core';
import {User} from '../models/User';

const LOGGED_USER_KEY = 'loggedUser';

@Injectable()
export class SessionService {

  // MANAGING USER SESSION
  setNewSession(user: User): void {
    sessionStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
  }

  getLoggedUser(): User {
    return JSON.parse(sessionStorage.getItem(LOGGED_USER_KEY)) as User;
  }

  removeUser() {
    sessionStorage.removeItem(LOGGED_USER_KEY);
  }
}
