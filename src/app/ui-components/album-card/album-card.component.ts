import { Component, Input, OnInit } from '@angular/core';
import { SpotifyTopInfo } from 'src/app/models/spotifyTopInfo';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.sass'],
})
export class AlbumCardComponent implements OnInit {
  displayData: boolean = false;
  smallTitle: string = "";
  @Input() albumData: SpotifyTopInfo | undefined = undefined;

  ngOnInit(){
    //displayData is equal to albumData.album 12 first characters
    this.smallTitle = this.albumData?.album?.substring(0, 14) || "";
    const originalLength = this.albumData?.album?.length || 0;
    if (this.smallTitle.length < originalLength)
    {
      this.smallTitle += "..";
    }
  }

  clickDisplayData()
  {
    this.displayData = !this.displayData;
  }
}
