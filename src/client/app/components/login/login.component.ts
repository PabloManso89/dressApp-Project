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

  public form: FormGroup;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  public errorType = {
    required: 'required',
    minlength: 'minlength',
    notEmail: 'email',
    notUserFound: 'notUserFound'
  };

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _router: Router,
    private _spinner: NgxSpinnerService
  ) {}

  public ngOnInit() {
    this.form = this._initForm();
  }

  private _initForm(): FormGroup {
    return this._fb.group({
      'email': this.email,
      'password': this.password
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      this._spinner.show();
      this._userService.isValidUser(this.email.value, this.password.value)
      .subscribe(validaUser => {
        this._spinner.hide();
        if (validaUser) {
          this.goToHome();
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

  public isErrorField(field): string | void {
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

  public goToHome(): void {
    this._router.navigate(['home']);
  }

  public goToRegister(): void {
    this._router.navigate(['register']);
  }

}
