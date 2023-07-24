import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private oauth2Client: OAuthService) {}

  get isLoggedIn(): boolean {
    return this.oauth2Client.hasValidAccessToken();
  }

  getUserInfo(): Promise<any> {
    return this.oauth2Client.loadUserProfile();
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
      }
    })
  }

  public refreshToken(): void {
    this.oauth2Client.refreshToken();
  }

  logout() {
    this.oauth2Client.logOut();
  }
}
