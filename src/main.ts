/// <reference types="@angular/localize" />

import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { APP_CONFIG, AppConfig } from './app/app-config';
import { environment } from './environments/environment';
import { OAuthModule } from 'angular-oauth2-oidc';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

if (environment.production) {
  enableProdMode();
}

// La URL del backend se resuelve en runtime desde assets/config.json
// (el contenedor la escribe al arrancar); environment queda como fallback.
fetch('assets/config.json')
  .then((response) => (response.ok ? response.json() : Promise.reject(new Error('config.json not found'))))
  .catch(() => ({ apiBaseUrl: environment.apiBaseUrl }))
  .then((config: AppConfig) =>
    bootstrapApplication(AppComponent, {
      providers: [
        provideZoneChangeDetection(),
        { provide: APP_CONFIG, useValue: config },
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideRouter(routes),
        provideAnimations(),
        provideTranslateService({
          loader: provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' }),
          fallbackLang: 'en',
        }),
        importProvidersFrom(OAuthModule.forRoot())
      ]
    })
  )
  .catch(err => console.error(err));
