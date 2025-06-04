import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { SpotifyService } from 'src/app/services/spotify.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.sass'],
    standalone: true,
    imports: [CommonModule]
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oauth2Service: OAuthService,
    private spotifyService: SpotifyService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('code');
    if (token) {
      this.oauth2Service.tryLogin().then((logged) => {
        if (logged) {
          this.userInfoService.onLoggedInChanged.next(true);
          this.spotifyService.getUserInfo();
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
