import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
