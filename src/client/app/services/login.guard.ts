import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {UsersService} from './users.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private userService: UsersService,
    private router: Router
  ) {};

  canActivate() {
    console.log('LoginGuard is checking');
    if (this.userService.isThereLoggedUser()) {
      return true;
    } else {
      alert('You need to be logged to get access to this page');
      console.log('redirecting to Login page');
      this.router.navigate(['login']);
      return false;
    }
  }
}
