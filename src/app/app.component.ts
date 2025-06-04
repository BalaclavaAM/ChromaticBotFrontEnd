import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/services/oauthconfig';
import { UserInfoService } from './services/user-info.service';
import { SpotifyService } from './services/spotify.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    standalone: false
})
export class AppComponent {

  constructor (public translate: TranslateService, private oauthService: OAuthService,
    private userInfoService: UserInfoService, private spotifyService: SpotifyService){
      //load lenguage from local storage
    const lang = localStorage.getItem('lang');
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    if (lang !== null) {
      translate.setDefaultLang(lang);
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
