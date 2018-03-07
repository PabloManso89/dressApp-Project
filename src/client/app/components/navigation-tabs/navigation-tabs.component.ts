import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss']
})
export class NavigationTabsComponent {
  public navLinks = [
    {
      label: 'Home',
      path: '/home'
    },
    {
      label: 'Expenses',
      path: '/expenses'
    },
    {
      label: 'Suggestions',
      path: '/suggestions'
    },
    {
      label: 'Purchases',
      path: '/purchases'
    }
  ]

  constructor() { }
}
