import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationTabsComponent} from '../navigation-tabs/navigation-tabs.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  constructor() {}
}
