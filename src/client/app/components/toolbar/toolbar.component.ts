import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @HostBinding('class') componentCssClass;
  // @Input() color: ThemePalette;
  constructor(public overlayContainer: OverlayContainer) { }

  ngOnInit() {
  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
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
