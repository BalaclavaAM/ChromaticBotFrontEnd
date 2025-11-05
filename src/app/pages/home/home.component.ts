import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, AlbumCardComponent]
})
export class HomeComponent implements OnInit {
  userProfile: SpotifyLoginInfo | undefined = this.userInfoService.userInfo;

  isLoggedIn: boolean = this.userInfoService.loggedIn;

  imagesInfo: SpotifyTopInfo[] = [];

  formGroup = new FormGroup({
    'tiempoRevision': new FormControl('6m'),
    'cantidadCanciones': new FormControl('10'),
    'sortMode': new FormControl('hue')
  })
  constructor(
    public translate: TranslateService,
    private readonly spotifyService: SpotifyService,
    private readonly userInfoService: UserInfoService,
    private readonly posterGenerator: PosterGeneratorService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userInfoService.onChanged.subscribe((userInfo) => {
      this.userProfile = userInfo;
    });
    this.userInfoService.onLoggedInChanged.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    // Re-fetch automático cuando cambia cantidad de canciones o modo de ordenamiento
    this.formGroup.get('cantidadCanciones')?.valueChanges.subscribe(() => {
      if (this.imagesInfo.length > 0) {
        this.getTop50Tracks();
      }
    });

    this.formGroup.get('sortMode')?.valueChanges.subscribe(() => {
      if (this.imagesInfo.length > 0) {
        this.getTop50Tracks();
      }
    });
  }

  login(): void {
    this.spotifyService.login();
  }

  isLoading: boolean = false;
  isGeneratingPoster: boolean = false;

  getTop50Tracks(): void {
    this.isLoading = true;
    const timeRevision = this.formGroup.get('tiempoRevision')?.value;
    const cantidadCanciones = this.formGroup.get('cantidadCanciones')?.value;
    const sortMode = this.formGroup.get('sortMode')?.value;

    this.spotifyService.getTop50Tracks(
      timeRevision ?? "6m",
      cantidadCanciones ?? "10",
      sortMode ?? "hue"
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.imagesInfo = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  async generatePoster(): Promise<void> {
    if (!this.imagesInfo || this.imagesInfo.length === 0) {
      alert(this.translate.instant('poster.noData'));
      return;
    }

    this.isGeneratingPoster = true;

    try {
      const timeRange = this.getTimeRangeLabel();
      const posterUrl = await this.posterGenerator.generatePoster(
        this.imagesInfo,
        this.userProfile?.display_name ?? 'Usuario',
        timeRange
      );

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
