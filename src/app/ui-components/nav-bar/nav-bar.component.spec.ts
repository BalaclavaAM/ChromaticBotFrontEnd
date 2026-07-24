import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { NavBarComponent } from './nav-bar.component';
import { APP_CONFIG } from 'src/app/app-config';
import { UserInfoService } from 'src/app/services/user-info.service';
import { buildLoginInfo, createOAuthServiceStub } from 'src/testing/mocks';

describe('NavBarComponent', () => {
  let oauthStub: ReturnType<typeof createOAuthServiceStub>;

  beforeEach(async () => {
    oauthStub = createOAuthServiceStub();
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
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

  it('should create', () => {
    const fixture = TestBed.createComponent(NavBarComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should reflect login state and user profile from the service', () => {
    const fixture = TestBed.createComponent(NavBarComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const userInfoService = TestBed.inject(UserInfoService);

    expect(component.isLoggedIn).toBe(false);

    userInfoService.onLoggedInChanged.next(true);
    userInfoService.onChanged.next(buildLoginInfo({ display_name: 'JuanMa' }));

    expect(component.isLoggedIn).toBe(true);
    expect(component.userProfile?.display_name).toBe('JuanMa');
  });

  it('should log out through the Spotify service', () => {
    const fixture = TestBed.createComponent(NavBarComponent);
    fixture.detectChanges();
    const userInfoService = TestBed.inject(UserInfoService);
    userInfoService.onLoggedInChanged.next(true);

    fixture.componentInstance.logout();

    expect(oauthStub.logOut).toHaveBeenCalled();
    expect(userInfoService.loggedIn).toBe(false);
  });
});
