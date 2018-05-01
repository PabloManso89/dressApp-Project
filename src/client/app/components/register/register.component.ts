import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, Form} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  emailFormControl: FormControl;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required, Validators.minLength(1)],
      emailFormControl: ['', Validators.email]
    });
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

}
