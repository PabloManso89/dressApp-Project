import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
