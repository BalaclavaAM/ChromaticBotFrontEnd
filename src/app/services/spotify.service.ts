import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { SpotifyLoginInfo } from '../models/spotifyLoginInfo';
import { UserInfoService } from './user-info.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifyTopInfo } from '../models/spotifyTopInfo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  baseUrl: string = environment.apiBaseUrl;
  constructor(
    private readonly oauth2Client: OAuthService,
    private readonly userInfoService: UserInfoService,
    private readonly httpClient: HttpClient
  ) {}

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

  public getTop50Tracks(
    timeRevision: string,
    quantitySongs: string,
    sortMode: string = 'hue'
  ): Observable<SpotifyTopInfo[]> {
    return this.httpClient.post<SpotifyTopInfo[]>(
      `${this.baseUrl}/chromatic/albums`,
      {
        token: this.oauth2Client.getAccessToken(),
        timeRevision,
        quantitySongs,
        sort_mode: sortMode
      }
    );
  }
}
