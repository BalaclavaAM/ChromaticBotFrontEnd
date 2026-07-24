import { Component, DestroyRef, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SpotifyLoginInfo } from 'src/app/models/spotifyLoginInfo';
import { SpotifyService } from 'src/app/services/spotify.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.sass'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgbModule, TranslatePipe, RouterLink, RouterLinkActive]
})
export class NavBarComponent implements OnInit {
  userProfile: SpotifyLoginInfo | undefined;
  isLoggedIn = false;
  isMenuCollapsed = true;

  private readonly destroyRef = inject(DestroyRef);

  constructor(public translate: TranslateService, private spotifyService: SpotifyService, private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.userInfoService.onChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((userInfo) => {
        this.userProfile = userInfo;
      });
    this.userInfoService.onLoggedInChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
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
