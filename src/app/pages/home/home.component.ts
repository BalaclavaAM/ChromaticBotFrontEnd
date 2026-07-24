import { Component, DestroyRef, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, merge, of } from 'rxjs';
import { catchError, debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { SpotifyLoginInfo } from 'src/app/models/spotifyLoginInfo';
import { SpotifyTopInfo } from 'src/app/models/spotifyTopInfo';
import { SpotifyService } from 'src/app/services/spotify.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { AlbumCardComponent } from 'src/app/ui-components/album-card/album-card.component';
import { PosterGeneratorService } from 'src/app/services/poster-generator.service';
import { PosterModalComponent } from 'src/app/ui-components/poster-modal/poster-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, TranslatePipe, NgbModule, AlbumCardComponent, RouterLink]
})
export class HomeComponent implements OnInit {
  userProfile: SpotifyLoginInfo | undefined;

  isLoggedIn = false;

  imagesInfo: SpotifyTopInfo[] = [];

  isLoading = false;
  isGeneratingPoster = false;
  hasLoadError = false;

  // Lomos de vinilo del hero: espectro con alturas pseudoaleatorias estables
  readonly spines = Array.from({ length: 28 }, (_, i) => ({
    color: `hsl(${Math.round((i / 28) * 330)} 72% ${52 + (i % 3) * 6}%)`,
    height: 42 + ((i * 37) % 58),
  }));

  readonly skeletons = Array.from({ length: 12 });

  formGroup = new FormGroup({
    'tiempoRevision': new FormControl('6m'),
    'cantidadCanciones': new FormControl('10'),
    'sortMode': new FormControl('hue'),
    'posterBackground': new FormControl('gradient-dark')
  })

  private readonly destroyRef = inject(DestroyRef);
  private readonly loadRequests = new Subject<void>();

  constructor(
    public translate: TranslateService,
    private readonly spotifyService: SpotifyService,
    private readonly userInfoService: UserInfoService,
    private readonly posterGenerator: PosterGeneratorService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userInfoService.onChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((userInfo) => {
        this.userProfile = userInfo;
      });
    this.userInfoService.onLoggedInChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
        // Al llegar con sesión, cargar el espectro sin pedir un click extra
        if (loggedIn && this.imagesInfo.length === 0 && !this.isLoading) {
          this.getTop50Tracks();
        }
      });

    // switchMap cancela la petición anterior: sin respuestas fuera de orden
    this.loadRequests
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.hasLoadError = false;
        }),
        switchMap(() =>
          this.spotifyService.getTop50Tracks(
            this.formGroup.get('tiempoRevision')?.value ?? '6m',
            this.formGroup.get('cantidadCanciones')?.value ?? '10',
            this.formGroup.get('sortMode')?.value ?? 'hue'
          ).pipe(
            catchError((error) => {
              console.error('Failed to load chromatic albums', error);
              this.hasLoadError = true;
              return of(null);
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        this.isLoading = false;
        if (res !== null) {
          this.imagesInfo = res;
        }
      });

    // Re-fetch automático cuando cambia cantidad, modo de ordenamiento o temporalidad
    merge(
      this.formGroup.get('cantidadCanciones')!.valueChanges,
      this.formGroup.get('sortMode')!.valueChanges,
      this.formGroup.get('tiempoRevision')!.valueChanges
    )
      .pipe(
        filter(() => this.imagesInfo.length > 0),
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.getTop50Tracks());
  }

  login(): void {
    this.spotifyService.login();
  }

  getTop50Tracks(): void {
    this.loadRequests.next();
  }

  async generatePoster(): Promise<void> {
    if (!this.imagesInfo || this.imagesInfo.length === 0) {
      alert(this.translate.instant('poster.noData'));
      return;
    }

    this.isGeneratingPoster = true;

    try {
      const timeRange = this.getTimeRangeLabel();
      const backgroundStyle = this.formGroup.get('posterBackground')?.value ?? 'gradient-dark';
      const userName = this.userProfile?.display_name ?? 'Usuario';
      const posterUrl = await this.posterGenerator.generatePoster(this.imagesInfo, {
        title: this.translate.instant('home.yourSpectrum'),
        subtitle: `@${userName} · ${timeRange} · ${this.imagesInfo.length} ${this.translate.instant('home.albums')}`,
        backgroundStyle,
      });

      this.openPosterModal(posterUrl);
    } catch (error) {
      console.error('Error generando póster:', error);
      alert(this.translate.instant('poster.error'));
    } finally {
      this.isGeneratingPoster = false;
    }
  }

  private getTimeRangeLabel(): string {
    const value = this.formGroup.get('tiempoRevision')?.value;
    switch (value) {
      case '1m':
        return this.translate.instant('home.radioButtons.1month');
      case '6m':
        return this.translate.instant('home.radioButtons.6months');
      case 'a':
        return this.translate.instant('home.radioButtons.allTime');
      default:
        return '';
    }
  }

  private openPosterModal(posterUrl: string): void {
    const modalRef = this.modalService.open(PosterModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.posterUrl = posterUrl;
    modalRef.componentInstance.userName = this.userProfile?.display_name ?? 'Usuario';
  }
}
