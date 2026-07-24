import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { CallbackComponent } from './callback.component';
import { APP_CONFIG } from 'src/app/app-config';
import { UserInfoService } from 'src/app/services/user-info.service';
import { createOAuthServiceStub } from 'src/testing/mocks';

describe('CallbackComponent', () => {
  let oauthStub: ReturnType<typeof createOAuthServiceStub>;
  let routerStub: { navigate: ReturnType<typeof vi.fn> };

  function setup(queryParams: Record<string, string>) {
    TestBed.configureTestingModule({
      imports: [CallbackComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_CONFIG, useValue: { apiBaseUrl: 'http://test' } },
        { provide: OAuthService, useValue: oauthStub },
        { provide: Router, useValue: routerStub },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap(queryParams) } },
        },
      ],
    });
    const fixture = TestBed.createComponent(CallbackComponent);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(() => {
    oauthStub = createOAuthServiceStub();
    routerStub = { navigate: vi.fn() };
  });

  it('should redirect home when Spotify returns an error', () => {
    setup({ error: 'access_denied' });
    expect(routerStub.navigate).toHaveBeenCalledWith(['/home']);
    expect(oauthStub.tryLogin).not.toHaveBeenCalled();
  });

  it('should redirect home when there is no code', () => {
    setup({});
    expect(routerStub.navigate).toHaveBeenCalledWith(['/home']);
    expect(oauthStub.tryLogin).not.toHaveBeenCalled();
  });

  it('should exchange the code, mark login and redirect home', async () => {
    oauthStub.hasValidAccessToken.mockReturnValue(true);
    setup({ code: 'auth-code' });
    await vi.waitFor(() => {
      expect(routerStub.navigate).toHaveBeenCalledWith(['/home']);
    });
    expect(oauthStub.tryLogin).toHaveBeenCalled();
    expect(TestBed.inject(UserInfoService).loggedIn).toBe(true);
  });

  it('should still redirect home when the code exchange fails', async () => {
    oauthStub.tryLogin.mockRejectedValue(new Error('bad code'));
    setup({ code: 'auth-code' });
    await vi.waitFor(() => {
      expect(routerStub.navigate).toHaveBeenCalledWith(['/home']);
    });
    expect(TestBed.inject(UserInfoService).loggedIn).toBe(false);
  });
});
