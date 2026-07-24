import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService } from '@ngx-translate/core';
import { AlbumCardComponent } from './album-card.component';
import { SpotifyTopInfo } from 'src/app/models/spotifyTopInfo';

const ALBUM: SpotifyTopInfo = {
  album: 'A very long album title that should be truncated',
  image: 'https://example.com/cover.png',
  colors: [[10, 20, 30], [40, 50, 60]],
  dominant: [10, 20, 30],
  colorfulness: 0.5,
  saturation: 0.6,
  brightness: 0.7,
  songs: [{ name: 'Song', artists: 'Artist' }],
};

describe('AlbumCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumCardComponent],
      providers: [provideNoopAnimations(), provideTranslateService()],
    }).compileComponents();
  });

  function create(albumData: SpotifyTopInfo) {
    const fixture = TestBed.createComponent(AlbumCardComponent);
    fixture.componentRef.setInput('albumData', albumData);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const fixture = create(ALBUM);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should truncate long album titles', () => {
    const fixture = create(ALBUM);
    expect(fixture.componentInstance.smallTitle).toBe('A very long al..');
  });

  it('should keep short album titles untouched', () => {
    const fixture = create({ ...ALBUM, album: 'Short' });
    expect(fixture.componentInstance.smallTitle).toBe('Short');
  });

  it('should flip the card on click', () => {
    const fixture = create(ALBUM);
    const component = fixture.componentInstance;
    expect(component.state).toBe('default');
    component.cardClicked();
    expect(component.state).toBe('flipped');
    component.cardClicked();
    expect(component.state).toBe('default');
  });
});
