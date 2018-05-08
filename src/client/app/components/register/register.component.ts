import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, Form} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  selectedGender: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ages = [
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
    '60', '61', '62', '63', '64', '65', '66', '67', '68', '69'];

  genders = [
    'Male',
    'Female'
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      nameControl: ['', Validators.required],
      surnameControl: ['', Validators.required],
      emailControl: ['', Validators.email]
    });
    this.secondFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
  }

  // get name() { return this.firstFormGroup.get('firstCtrl'); }


}
