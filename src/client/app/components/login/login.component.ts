import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service'
import { User } from '../../models/User';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loggedUser: User;
  form: FormGroup;

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
    private router: Router,
    private spinner: NgxSpinnerService
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
      this.spinner.show();
      this.userService.isValidUser(this.email.value, this.password.value)
      .subscribe(validaUser => {
        this.spinner.hide();
        if (validaUser) {
          this.login();
        } else {
          this.showNotValidUser();
        }
      });
    } else {
      this.showNotValidUser();
    }
  }

  private showNotValidUser(): void {
    // TODO show alert()
    alert('User not found');
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

  // TODO move this to register when its done
  canDeactivate() {
    return this.form.valid;
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

}
