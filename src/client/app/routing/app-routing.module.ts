import { NgModule } from '@angular/core';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.route';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]

})
export class AppRoutingModule { }
