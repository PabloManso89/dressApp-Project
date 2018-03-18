import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  language = undefined;
  constructor() {}
  public setLanguage = () => {
    let localeId = localStorage.getItem('localeId');
    if (localeId === 'es') {
      localeId = 'fr';
    } else {
      localeId = 'es';
    }
    localStorage.setItem('localeId', localeId);
    console.log('locale set to:' + localeId);
    location.reload(true);
  }
}
