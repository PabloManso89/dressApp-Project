import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PurchasesComponent {
  @HostBinding('class') componentCssClass;
  isTheme = false;
  language = undefined;

  constructor(public overlayContainer: OverlayContainer) {}

  onChangeTheme() {
    this.isTheme = !this.isTheme;
  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    this.isTheme = !this.isTheme;
  }

  public setLanguage = (language: string) => {
    let localeId = localStorage.getItem('localeId');
    switch (language) {
      case 'spanish':
        localeId = 'es';
        break;
      case 'french':
        localeId = 'fr';
        break;
      case 'english':
        localeId = 'en';
        break;
    }
    // if (localeId === 'es') {
    //   localeId = 'fr';
    // } else {
    //   localeId = 'es';
    // }
    localStorage.setItem('localeId', localeId);
    console.log('locale set to:' + localeId);
    location.reload(true);
  }
}
