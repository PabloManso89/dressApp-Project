import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatTabsModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavigationTabsComponent } from './components/navigation-tabs/navigation-tabs.component';

import { AppRoutingModule } from './routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { OverlayModule} from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginModule } from './components/login/login.module';

import { UsersService } from './services/users.service'

import { LoginGuard } from './services/login.guard';
import {UncompletedRegisterUserGuard} from './services/uncompleteRegisterUser.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpensesComponent,
    PurchasesComponent,
    SuggestionsComponent,
    NavigationTabsComponent,
    NotfoundComponent,
    NavigationTabsComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    AppRoutingModule,
    MatTabsModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-fs'),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    OverlayModule,
    FlexLayoutModule,
    LoginModule
  ],
  providers: [
    UsersService,
    { provide: LOCALE_ID, useValue: 'fr', useFactory: getLocalStorage },
    LoginGuard,
    UncompletedRegisterUserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}
