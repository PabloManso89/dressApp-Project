// THIRD PARTY IMPORTS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatTabsModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { OverlayModule} from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// MODULES
import { AppRoutingModule } from './routing/app-routing.module';
import { LoginModule } from './components/login/login.module';
import {RegisterModule} from './components/register/register.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavigationTabsComponent } from './components/navigation-tabs/navigation-tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

// SERVICES
import { UsersService } from './services/users.service'
import { SessionService } from './services/session.service'

// GUARDS
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
    LoginModule,
    RegisterModule,
  ],
  providers: [
    UsersService,
    SessionService,
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
