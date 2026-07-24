import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { SpotifyService } from 'src/app/services/spotify.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.sass'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: []
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
    const params = this.route.snapshot.queryParamMap;

    // Spotify redirige con ?error=access_denied si el usuario cancela
    if (params.get('error') || !params.get('code')) {
      this.router.navigate(['/home']);
      return;
    }

    this.oauth2Service.tryLogin()
      .then(() => {
        if (this.oauth2Service.hasValidAccessToken()) {
          this.userInfoService.onLoggedInChanged.next(true);
          this.spotifyService.getUserInfo();
        }
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('OAuth code exchange failed', error);
        this.router.navigate(['/home']);
      });
  }
}
