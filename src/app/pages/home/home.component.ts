import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpotifyLoginInfo } from 'src/app/models/spotifyLoginInfo';
import { SpotifyTopInfo } from 'src/app/models/spotifyTopInfo';
import { SpotifyService } from 'src/app/services/spotify.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { AlbumCardComponent } from 'src/app/ui-components/album-card/album-card.component';

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
  })
  constructor(
    public translate: TranslateService,
    private spotifyService: SpotifyService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.userInfoService.onChanged.subscribe((userInfo) => {
      this.userProfile = userInfo;
    });
    this.userInfoService.onLoggedInChanged.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  login(): void {
    this.spotifyService.login();
  }

  getTop50Tracks(): void {
    const timeRevision = this.formGroup.get('tiempoRevision')?.value;
    const cantidadCanciones = this.formGroup.get('cantidadCanciones')?.value;
    this.spotifyService.getTop50Tracks(timeRevision ?? "2", cantidadCanciones ?? "10").subscribe((res) => {
      console.log(res);
      this.imagesInfo = res;
    });
  }
}
