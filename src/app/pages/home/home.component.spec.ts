import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HomeComponent } from './home.component';
import { APP_CONFIG } from 'src/app/app-config';
import { SpotifyTopInfo } from 'src/app/models/spotifyTopInfo';
import { createOAuthServiceStub } from 'src/testing/mocks';

const ALBUM: SpotifyTopInfo = {
  album: 'Test Album',
  image: 'https://example.com/cover.png',
  colors: [[10, 20, 30]],
  dominant: [10, 20, 30],
  colorfulness: 0.5,
  saturation: 0.6,
  brightness: 0.7,
  songs: [{ name: 'Song', artists: 'Artist' }],
};

describe('HomeComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideTranslateService(),
        { provide: APP_CONFIG, useValue: { apiBaseUrl: 'http://test' } },
        { provide: OAuthService, useValue: createOAuthServiceStub() },
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load albums from the backend', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.getTop50Tracks();
    const req = httpMock.expectOne('http://test/chromatic/albums');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.timeRevision).toBe('6m');
    req.flush([ALBUM]);

    expect(component.imagesInfo.length).toBe(1);
    expect(component.isLoading).toBe(false);
    expect(component.hasLoadError).toBe(false);
  });

  it('should cancel the in-flight request when a new one starts', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.getTop50Tracks();
    const first = httpMock.expectOne('http://test/chromatic/albums');
    component.getTop50Tracks();
    const second = httpMock.expectOne('http://test/chromatic/albums');

    expect(first.cancelled).toBe(true);
    second.flush([ALBUM, ALBUM]);
    expect(component.imagesInfo.length).toBe(2);
  });

  it('should flag an error when the backend fails', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.getTop50Tracks();
    httpMock.expectOne('http://test/chromatic/albums')
      .flush({ detail: 'boom' }, { status: 500, statusText: 'Server Error' });

    expect(component.hasLoadError).toBe(true);
    expect(component.isLoading).toBe(false);
    expect(component.imagesInfo.length).toBe(0);
  });
});
