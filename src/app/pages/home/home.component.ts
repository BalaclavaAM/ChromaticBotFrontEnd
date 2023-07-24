import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SpotifyLoginInfo } from 'src/app/models/spotifyLoginInfo';
import { SpotifyService } from 'src/app/services/spotify.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  userProfile: SpotifyLoginInfo | undefined = this.userInfoService.userInfo;

  isLoggedIn: boolean = this.userInfoService.loggedIn;

  constructor(public translate: TranslateService, private spotifyService: SpotifyService, private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.userInfoService.onChanged.subscribe((userInfo) => {
      this.userProfile = userInfo;
    });
    this.userInfoService.onLoggedInChanged.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
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
