import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatInputModule, MatTabsModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppRoutingModule } from './routing/app-routing.module';
import {NavigationTabsComponent} from './components/navigation-tabs/navigation-tabs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {OverlayContainer, OverlayModule} from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpensesComponent,
    PurchasesComponent,
    SuggestionsComponent,
    NotfoundComponent,
    NavigationTabsComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatInputModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
