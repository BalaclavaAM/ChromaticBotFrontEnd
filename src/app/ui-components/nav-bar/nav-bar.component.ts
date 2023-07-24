import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {

  constructor(public translate: TranslateService, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }
  public switchLanguage(lang: string){
    this.translate.use(lang);
  }
  get isLoggedIn(): boolean {
    return this.spotifyService.isLoggedIn;
  }
  logout(): void {
    this.spotifyService.logout();
  }
}
