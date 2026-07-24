import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { APP_CONFIG } from './app-config';
import { UserInfoService } from './services/user-info.service';
import { createOAuthServiceStub } from 'src/testing/mocks';

describe('AppComponent', () => {
  let oauthStub: ReturnType<typeof createOAuthServiceStub>;

  beforeEach(async () => {
    oauthStub = createOAuthServiceStub();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideTranslateService(),
        { provide: APP_CONFIG, useValue: { apiBaseUrl: 'http://test' } },
        { provide: OAuthService, useValue: oauthStub },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should configure OAuth on startup', () => {
    TestBed.createComponent(AppComponent);
    expect(oauthStub.configure).toHaveBeenCalled();
    expect(oauthStub.setupAutomaticSilentRefresh).toHaveBeenCalled();
  });

  it('should mark the user as logged in when a valid token exists', () => {
    oauthStub.hasValidAccessToken.mockReturnValue(true);
    TestBed.createComponent(AppComponent);
    expect(TestBed.inject(UserInfoService).loggedIn).toBe(true);
  });
});
