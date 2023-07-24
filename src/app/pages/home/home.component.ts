import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { SpotifyLoginInfo } from 'src/app/models/spotifyLoginInfo';
import { authCodeFlowConfig } from 'src/app/services/oauthconfig';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  userProfile: SpotifyLoginInfo | undefined;

  constructor(public translate: TranslateService, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    if (this.spotifyService.isLoggedIn) {
      this.spotifyService.getUserInfo().then((data) => {
        console.log('trying to get user info');
        this.userProfile = data.info as SpotifyLoginInfo;
      });
    }
  }

  get isLoggedIn(): boolean {
    return this.spotifyService.isLoggedIn;
  }


  login(): void {
    this.spotifyService.login();
  }

  refreshToken(): void {
    this.spotifyService.refreshToken();
  }

  getToken() : void {
    const token = this.spotifyService.getToken();
    console.log(token);
  }

  logout(): void {
    this.spotifyService.logout();
  }
}
