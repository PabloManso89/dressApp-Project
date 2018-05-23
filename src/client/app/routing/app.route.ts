import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { PurchasesComponent } from '../components/purchases/purchases.component';
import { ExpensesComponent } from '../components/expenses/expenses.component';
import { SuggestionsComponent } from '../components/suggestions/suggestions.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { LoginComponent } from '../components/login/login.component';
import {LoginGuard} from "../services/login.guard";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  {path: 'purchases', component: PurchasesComponent},
  {path: 'expenses', component: ExpensesComponent},
  {path: 'suggestions', component: SuggestionsComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent},
];
