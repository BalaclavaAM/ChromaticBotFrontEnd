import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.sass'],
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oauth2Service: OAuthService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('code');
    if (token) {
      this.oauth2Service.tryLogin().then((logged) => {
        if (logged) {
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
