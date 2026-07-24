import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { SpotifyLoginInfo } from '../models/spotifyLoginInfo';
import { UserInfoService } from './user-info.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifyTopInfo } from '../models/spotifyTopInfo';
import { APP_CONFIG } from '../app-config';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  baseUrl: string = inject(APP_CONFIG).apiBaseUrl;
  constructor(
    private readonly oauth2Client: OAuthService,
    private readonly userInfoService: UserInfoService,
    private readonly httpClient: HttpClient
  ) {}

  get isLoggedIn(): boolean {
    return this.oauth2Client.hasValidAccessToken();
  }

  getUserInfo(): void {
    this.oauth2Client.loadUserProfile()
      .then((userInfo) => {
        this.userInfoService.onChanged.next((userInfo as { info: SpotifyLoginInfo }).info);
      })
      .catch((error) => {
        console.error('Failed to load Spotify user profile', error);
      });
  }

  public login(): void {
    if (!this.oauth2Client.hasValidAccessToken()) {
      this.oauth2Client.initLoginFlow();
    }
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
