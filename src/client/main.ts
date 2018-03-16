import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

// use the require method provided by webpack
declare const require;

// get the data
const localeId = localStorage.getItem('localeId');

if (localeId !== undefined) {
  // we use the webpack raw-loader to return the content as a string
  const translations = require(`raw-loader!./i18n/texts.` + localeId + `.xlf`);

  platformBrowserDynamic().bootstrapModule(AppModule, {
    providers: [
      {provide: TRANSLATIONS, useValue: translations},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
    ]
  });
} else {
  platformBrowserDynamic().bootstrapModule(AppModule);
}

