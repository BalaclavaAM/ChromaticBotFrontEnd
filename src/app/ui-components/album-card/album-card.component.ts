import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { SpotifyTopInfo } from 'src/app/models/spotifyTopInfo';

@Component({
    selector: 'app-album-card',
    templateUrl: './album-card.component.html',
    styleUrls: ['./album-card.component.sass'],
    animations: [
        trigger("cardFlip", [
            state("default", style({
                transform: "none"
            })),
            state("flipped", style({
                transform: "rotateY(180deg)"
            })),
            transition("default => flipped", [animate("470ms")]),
            transition("flipped => default", [animate("470ms")]),
        ])
    ],
    standalone: false
})
export class AlbumCardComponent implements OnInit {
  displayData: boolean = false;
  smallTitle: string = "";
  state: string = "default";
  @Input() albumData: SpotifyTopInfo | undefined = undefined;

  ngOnInit(){
    //displayData is equal to albumData.album 12 first characters
    this.smallTitle = this.albumData?.album?.substring(0, 14) ?? "";
    const originalLength = this.albumData?.album?.length ?? 0;
    if (this.smallTitle.length < originalLength)
    {
      this.smallTitle += "..";
    }
  }

  clickDisplayData()
  {
    this.displayData = !this.displayData;
  }

  cardClicked(){
    this.state = this.state === "default" ? "flipped" : "default";
  }
}
