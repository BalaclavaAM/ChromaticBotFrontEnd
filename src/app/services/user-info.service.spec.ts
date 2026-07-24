import { TestBed } from '@angular/core/testing';
import { UserInfoService } from './user-info.service';
import { buildLoginInfo } from 'src/testing/mocks';

describe('UserInfoService', () => {
  let service: UserInfoService;

  beforeEach(() => {
    service = TestBed.inject(UserInfoService);
  });

  it('should start logged out and without profile', () => {
    expect(service.loggedIn).toBe(false);
    expect(service.userInfo).toBeUndefined();
  });

  it('should expose the latest emitted values', () => {
    const info = buildLoginInfo();
    service.onChanged.next(info);
    service.onLoggedInChanged.next(true);

    expect(service.userInfo).toEqual(info);
    expect(service.loggedIn).toBe(true);
  });

  it('should replay the current value to late subscribers', () => {
    service.onLoggedInChanged.next(true);

    let observed: boolean | undefined;
    service.onLoggedInChanged.subscribe((value) => (observed = value));

    expect(observed).toBe(true);
  });
});
