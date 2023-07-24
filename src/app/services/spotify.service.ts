import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { SpotifyLoginInfo } from '../models/spotifyLoginInfo';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private oauth2Client: OAuthService, private userInfoService: UserInfoService) {}

  get isLoggedIn(): boolean {
    return this.oauth2Client.hasValidAccessToken();
  }

  getUserInfo(): void {
    this.oauth2Client.loadUserProfile().then((userInfo: any) => {
      console.log('userInfo', userInfo);
      this.userInfoService.onChanged.next(userInfo.info as SpotifyLoginInfo);
    });
  }

  public login(): void {
    //if not code then
    if (!this.oauth2Client.hasValidAccessToken()) {
      this.oauth2Client.initLoginFlow();
    }
  }

  public getToken() {
    return this.oauth2Client.tryLogin({
      onTokenReceived: (receivedTokens) => {
        console.log('receivedTokens', receivedTokens);
      },
    });
  }

  public refreshToken(): void {
    this.oauth2Client.refreshToken();
  }

  logout() {
    this.oauth2Client.logOut();
    this.userInfoService.onLoggedInChanged.next(false);
  }
}
