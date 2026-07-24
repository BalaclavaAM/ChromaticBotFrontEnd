import { Injectable } from '@angular/core';
import { SpotifyLoginInfo } from '../models/spotifyLoginInfo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  readonly onChanged = new BehaviorSubject<SpotifyLoginInfo | undefined>(undefined);
  readonly onLoggedInChanged = new BehaviorSubject<boolean>(false);

  get userInfo(): SpotifyLoginInfo | undefined {
    return this.onChanged.value;
  }

  get loggedIn(): boolean {
    return this.onLoggedInChanged.value;
  }
}
