import { Component, OnInit } from '@angular/core';
import 'rxjs/add/Observable/fromEvent'

import { UsersService } from '../../services/users.service'
import { User } from '../../models/User';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loggedUser: User;
  form: FormGroup;
  showSpinner: boolean;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  errorType = {
    required: 'required',
    minlength: 'minlength',
    notEmail: 'email',
    notUserFound: 'notUserFound'
  };

  constructor(
    fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
      this.form = fb.group({
        'email': this.email,
        'password': this.password
      });
    }

  ngOnInit() {
    // this.userService.getUsers().subscribe( users => { console.log(users); });
  }
  login() {
    this.router.navigate(['home']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.isValidUser(this.email.value, this.password.value)
      .subscribe(validaUser => {
        if (validaUser) {
          this.login();
        }
      });
    } else {
      // user not found
      // TODO show alert()
    }

    console.log(this);
  }
  isErrorField(field): string | void {
    if (field.invalid && field.touched) {
      if (field.errors[this.errorType.required]) {
        return this.errorType.required;
      } else if (field.errors[this.errorType.minlength]) {
        return this.errorType.minlength;
      } else if (field.errors[this.errorType.notEmail]) {
        return this.errorType.notEmail;
      }
    }
    return;
  }

}
