import {Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {PurchasesComponent} from '../components/purchases/purchases.component';
import {ExpensesComponent} from '../components/expenses/expenses.component';
import {SuggestionsComponent} from '../components/suggestions/suggestions.component';
import {NotfoundComponent} from '../components/notfound/notfound.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'purchases', component: PurchasesComponent},
  {path: 'expenses', component: ExpensesComponent},
  {path: 'suggestions', component: SuggestionsComponent},
  {path: '**', component: NotfoundComponent},
];
