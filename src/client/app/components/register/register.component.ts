import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {RESULT_MESSAGES} from '../../utils/constants';
import {resultTypes} from '../../utils/types';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public passwordValidator = [];
  errorType = {
    min: 'min',
    minLength: 'minLength',
    max: 'max',
    maxLength: 'maxLength',
    notEmail: 'email',
    notUserFound: 'notUserFound',
    required: 'required'
  };

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _router: Router,
    private _spinner: NgxSpinnerService
  ) {}

  public ngOnInit() {
    this.passwordValidator.push(Validators.required);
    this.passwordValidator.push(Validators.minLength(4));
    this.passwordValidator.push(Validators.maxLength(4));

    this.form = this._initForm();
  }

  private _initForm(): FormGroup {
    return this._fb.group({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.compose(this.passwordValidator)]),
      'age': new FormControl(undefined, [Validators.min(14), Validators.max(100)]),
      'gender': new FormControl('', [])
    });
  }

  public isErrorField(field): string | void {
    if (field.invalid && field.touched) {
      if (field.errors[this.errorType.required]) {
        return this.errorType.required;
      } else if (field.errors[this.errorType.min]) {
        return this.errorType.min;
      } else if (field.errors[this.errorType.max]) {
        return this.errorType.max;
      } else if (field.errors[this.errorType.minLength]) {
        return this.errorType.minLength;
      } else if (field.errors[this.errorType.maxLength]) {
        return this.errorType.maxLength;
      } else if (field.errors[this.errorType.notEmail]) {
        return this.errorType.notEmail;
      }
    }
    return;
  }

  private _goToLogin() {
    this._router.navigate(['login']);
  }

  public onSubmit() {
    this._spinner.show();
    this._userService.registerNewUser(this.form.value).subscribe((resultcode: resultTypes) => {
      this._spinner.hide();
      alert(RESULT_MESSAGES[resultcode]);
      this._goToLogin();
    });
  }

  public canDeactivate() {
    return !this.form.touched || this.form.valid;
  }

}
