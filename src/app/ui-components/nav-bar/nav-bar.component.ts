import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SpotifyLoginInfo } from 'src/app/models/spotifyLoginInfo';
import { SpotifyService } from 'src/app/services/spotify.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.sass'],
    standalone: false
})
export class NavBarComponent implements OnInit {
  userProfile: SpotifyLoginInfo | undefined = this.userInfoService.userInfo;
  isLoggedIn: boolean = this.userInfoService.loggedIn;
  isMenuCollapsed = true;
  constructor(public translate: TranslateService, private spotifyService: SpotifyService, private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.userInfoService.onChanged.subscribe((userInfo) => {
      this.userProfile = userInfo;
    });
    this.userInfoService.onLoggedInChanged.subscribe((loggedIn) => {
      if (loggedIn) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  public switchLanguage(lang: string){
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
  logout(): void {
    this.spotifyService.logout();
  }
}
