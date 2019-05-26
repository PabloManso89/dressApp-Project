import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service'
import { User } from '../../models/User';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {SessionService} from '../../services/session.service';
import {RESULT_MESSAGES} from '../../utils/constants';
import {resultTypes} from '../../utils/types';

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
    private _sessionService: SessionService,
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
      this._userService.isRegisteredUser(this.email.value, this.password.value)
      .subscribe((user: User|resultTypes) => {
        this._spinner.hide();
        if (user && (user as User).email) {
          this._sessionService.setNewSession(user as User);
          this.goToHome();
        } else {
          alert(RESULT_MESSAGES[user as resultTypes]);
        }
      });
    } else {
      alert(RESULT_MESSAGES.INVALID_FORM);
    }
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
