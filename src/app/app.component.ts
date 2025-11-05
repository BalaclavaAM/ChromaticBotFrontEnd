import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/services/oauthconfig';
import { UserInfoService } from './services/user-info.service';
import { SpotifyService } from './services/spotify.service';
import { NavBarComponent } from './ui-components/nav-bar/nav-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    standalone: true,
    imports: [RouterOutlet, NavBarComponent]
})
export class AppComponent {

  constructor (public translate: TranslateService, private oauthService: OAuthService,
    private userInfoService: UserInfoService, private spotifyService: SpotifyService){
    // Configurar idiomas disponibles
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');

    // Detectar idioma: primero localStorage, luego navegador, finalmente default
    const savedLang = localStorage.getItem('lang');
    if (savedLang !== null && translate.getLangs().includes(savedLang)) {
      // Usar idioma guardado si existe
      translate.use(savedLang);
    } else {
      // Detectar idioma del navegador
      const browserLang = translate.getBrowserLang();
      const langToUse = browserLang && translate.getLangs().includes(browserLang) ? browserLang : 'en';
      translate.use(langToUse);
      // Guardar la detección automática en localStorage
      localStorage.setItem('lang', langToUse);
    }
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    if (this.oauthService.hasValidAccessToken()) {
      this.userInfoService.onLoggedInChanged.next(true);
      if (userInfoService.userInfo === undefined) {
        this.spotifyService.getUserInfo();
      }
    }
  }
  
}
