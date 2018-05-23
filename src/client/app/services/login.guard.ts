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
      window.alert('You don\'t have permission to view this page');
      console.log('redirecting to Login page');
      this.router.navigate(['login']);
      return false;
    }
  }
}
