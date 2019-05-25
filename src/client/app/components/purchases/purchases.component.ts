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

  constructor(public overlayContainer: OverlayContainer) {
    console.log('purchases');
  }

  onChangeTheme() {
    this.isTheme = !this.isTheme;
  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    this.isTheme = !this.isTheme;
  }
}
