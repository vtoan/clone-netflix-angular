import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Plyr from 'plyr';
import { ILayoutConfig } from '../../layout/main-page/main-page.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements AfterViewInit, OnInit {
  layoutConfig: ILayoutConfig = {
    title: 'Phim le',
    isLoading: true,
    isEmpty: true,
  };
  trailerLink: string =
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4';
  public playerMovie;
  constructor() {}
  ngOnInit(): void {
    this.layoutConfig.isLoading = false;
    this.layoutConfig.isEmpty = false;
  }

  ngAfterViewInit(): void {
    this.playerMovie = new Plyr('#player', {
      autoplay: true,
    });
    this.playerMovie.play();
    this.playerMovie.fullscreen.enter();
  }
}
