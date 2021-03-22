import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Plyr from 'plyr';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieService } from 'src/app/services/movie.service';
import { ILayoutConfig } from '../../layout/main-page/main-page.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements AfterViewInit, OnInit {
  movieItem: IMovie;
  layoutConfig: ILayoutConfig = {
    title: '',
    isLoading: false,
    isEmpty: false,
  };
  public playerMovie;
  constructor(private route: ActivatedRoute, private movieSer: MovieService) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    this.movieSer.getById(movieId).then((data) => {
      this.movieItem = data;
      this.layoutConfig.title =
        'Ban dang xem phim: ' + data.name + ' - ' + data.year;
      this.layoutConfig.isLoading = false;
      this.layoutConfig.isEmpty = false;
      this._playMoive(data.linkMovie);
    });
  }

  ngAfterViewInit(): void {
    this.playerMovie = new Plyr('#player', {
      autoplay: true,
    });
  }

  private _playMoive(link) {
    this.playerMovie.source = {
      type: 'video',
      sources: [
        {
          src: link,
          type: 'video/mp4',
          size: 720,
        },
      ],
    };
    this.playerMovie.play();
    this.playerMovie.fullscreen.enter();
  }
}
