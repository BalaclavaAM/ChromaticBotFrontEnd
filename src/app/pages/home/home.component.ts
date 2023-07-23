import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(public translate: TranslateService, private oauthService: OAuthService) { }

  ngOnInit(): void {
  }


  buttonClick(): void {
    this.oauthService.initCodeFlow();
  }
}
