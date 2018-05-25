import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { PurchasesComponent } from '../components/purchases/purchases.component';
import { ExpensesComponent } from '../components/expenses/expenses.component';
import { SuggestionsComponent } from '../components/suggestions/suggestions.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { LoginComponent } from '../components/login/login.component';
import {LoginGuard} from '../services/login.guard';
import {UncompletedRegisterUserGuard} from '../services/uncompleteRegisterUser.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, canDeactivate: [UncompletedRegisterUserGuard]},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  {path: 'purchases', component: PurchasesComponent, canActivate: [LoginGuard]},
  {path: 'expenses', component: ExpensesComponent, canActivate: [LoginGuard]},
  {path: 'suggestions', component: SuggestionsComponent, canActivate: [LoginGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent},
];
