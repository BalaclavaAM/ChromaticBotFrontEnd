import { Injectable } from '@angular/core';
import { SpotifyLoginInfo } from '../models/spotifyLoginInfo';
import { Subject } from 'rxjs';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public userInfo : SpotifyLoginInfo | undefined;
  public onChanged : Subject<SpotifyLoginInfo> = new Subject<SpotifyLoginInfo>();
  public loggedIn : boolean = false;
  public onLoggedInChanged : Subject<boolean> = new Subject<boolean>();
  constructor() {
    this.onChanged.subscribe((userInfo) => {
      this.userInfo = userInfo;
    });
    this.onLoggedInChanged.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
   }
}
