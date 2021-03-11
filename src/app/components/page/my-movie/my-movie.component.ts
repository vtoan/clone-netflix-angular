import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieService } from 'src/app/services/movie.service';
import { ILayoutConfig } from '../../layout/main-page/main-page.component';

@Component({
  selector: 'app-my-movie',
  templateUrl: './my-movie.component.html',
  styleUrls: ['./my-movie.component.css'],
})
export class MyMovieComponent implements OnInit {
  listMovie: IMovie[] = [];
  layoutConfig: ILayoutConfig = {
    title: 'Phim le',
    isLoading: true,
    isEmpty: true,
  };
  constructor(private movieSer: MovieService) {}

  ngOnInit(): void {
    this.movieSer.getAll().then((data) => {
      this.listMovie = data;
      this.layoutConfig.isLoading = false;
      this.layoutConfig.isEmpty = data.length == 0;
    });
  }
}
