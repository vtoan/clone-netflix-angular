import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-my-movie',
  templateUrl: './my-movie.component.html',
  styleUrls: ['./my-movie.component.css'],
})
export class MyMovieComponent implements OnInit {
  listMovie: IMovie[] = [];
  isLoading: boolean = true;
  isEmpty: boolean = true;
  constructor(private movieSer: MovieService) {}

  ngOnInit(): void {
    this.movieSer.getAll().then((data) => {
      this.listMovie = data;
      this.isLoading = false;
      this.isEmpty = data.length == 0;
    });
  }
}
