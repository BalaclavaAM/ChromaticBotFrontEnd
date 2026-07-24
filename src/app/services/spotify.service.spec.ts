import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { SpotifyService } from './spotify.service';
import { UserInfoService } from './user-info.service';
import { APP_CONFIG } from '../app-config';
import { createOAuthServiceStub } from 'src/testing/mocks';

describe('SpotifyService', () => {
  let service: SpotifyService;
  let httpMock: HttpTestingController;
  let oauthStub: ReturnType<typeof createOAuthServiceStub>;

  beforeEach(() => {
    oauthStub = createOAuthServiceStub();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_CONFIG, useValue: { apiBaseUrl: 'http://test' } },
        { provide: OAuthService, useValue: oauthStub },
      ],
    });
    service = TestBed.inject(SpotifyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post the chromatic request with the access token', () => {
    service.getTop50Tracks('1m', '25', 'saturation').subscribe();

    const req = httpMock.expectOne('http://test/chromatic/albums');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      token: 'test-token',
      timeRevision: '1m',
      quantitySongs: '25',
      sort_mode: 'saturation',
    });
    req.flush([]);
  });

  it('should start the login flow only when there is no valid token', () => {
    service.login();
    expect(oauthStub.initLoginFlow).toHaveBeenCalledTimes(1);

    oauthStub.hasValidAccessToken.mockReturnValue(true);
    service.login();
    expect(oauthStub.initLoginFlow).toHaveBeenCalledTimes(1);
  });

  it('should clear login state on logout', () => {
    const userInfoService = TestBed.inject(UserInfoService);
    userInfoService.onLoggedInChanged.next(true);

    service.logout();

    expect(oauthStub.logOut).toHaveBeenCalled();
    expect(userInfoService.loggedIn).toBe(false);
  });

  it('should publish the user profile after loading it', async () => {
    const userInfoService = TestBed.inject(UserInfoService);
    service.getUserInfo();
    await vi.waitFor(() => {
      expect(userInfoService.userInfo?.display_name).toBe('Test User');
    });
  });
});
