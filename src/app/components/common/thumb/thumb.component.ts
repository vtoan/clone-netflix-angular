import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import * as Plyr from 'plyr';

@Component({
  selector: 'thumb',
  templateUrl: './thumb.component.html',
})
export class ThumbComponent implements AfterViewInit, OnDestroy {
  @Input() playerId: string="player";
  @Input() playTrailer: boolean = false;
  @Input() thumbLink: string = '/assets/thumbs/01.jpg';
  @Input() trailerLink: string =
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4';
    
  public player;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.playTrailer) {
      this.player = new Plyr('#'+this.playerId, {
        autoplay: true,
        controls: ['mute'],
      });
      this.player.play();
    }
  }
  ngOnDestroy(): void {
    // this.player.destroy();
    // console.log('destroy trailer');
  }
}
