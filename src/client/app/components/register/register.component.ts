import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service'
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
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
  public passwordValidator2 = [];
  public passMatcher: any;
  errorType = {
    min: 'min',
    minLength: 'minlength',
    max: 'max',
    maxLength: 'maxlength',
    noEmail: 'email',
    noPasswordMatch: 'noPasswordMatch',
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

    this.passwordValidator2.push(Validators.required);
    this.passwordValidator2.push(Validators.minLength(4));
    this.passwordValidator2.push(Validators.maxLength(4));

    this.passMatcher = (control: AbstractControl): {[key: string]: boolean} => {
      if (!this.form) {return null}
      const pass = this.form.get('password');
      const confirm = this.form.get('passwordConfirmation');
      if (!pass || !confirm) {return null}
      return pass.value === confirm.value ? null : { noPasswordMatch: true };
    };

    this.passwordValidator2.push(this.passMatcher);
    this.form = this._initForm();
  }

  private _initForm(): FormGroup {
    return this._fb.group({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.compose(this.passwordValidator)]),
      'passwordConfirmation': new FormControl('', [Validators.compose(this.passwordValidator2)]),
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
      } else if (field.errors[this.errorType.noEmail]) {
        return this.errorType.noEmail;
      } else if (field.errors[this.errorType.noPasswordMatch]) {
        return this.errorType.noPasswordMatch;
      }
    }
    return;
  }

  private _goToLogin() {
    this._router.navigate(['login']);
  }

  public onSubmit() {
    this._spinner.show();
    this._userService.registerNewUser(this.form.value).subscribe((resultCode: resultTypes) => {
      this._spinner.hide();
      alert(RESULT_MESSAGES[resultCode]);
      this._goToLogin();
    });
  }

  public canDeactivate() {
    return !this.form.touched || this.form.valid;
  }

}
