import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { IMovieListView } from 'src/app/interfaces/IMovieListVIew';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-popular-movie',
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.css'],
})
export class PopularMovieComponent implements OnInit {
  listMovieView: IMovieListView[] = [];
  isLoading: boolean = true;
  isEmpty: boolean = true;

  constructor(private movieSer: MovieService) {}

  ngOnInit(): void {
    this.movieSer.getAll().then((data) => {
      this.isLoading = false;
      this.isEmpty = data.length == 0;
      this.FilterMovie(data);
    });
  }

  private FilterMovie(datas: IMovie[]): void {
    this.listMovieView.push({
      title: 'Hanh dong',
      movies: datas.slice(0, 10),
    });
    this.listMovieView.push({
      title: 'AC',
      movies: datas.slice(10),
    });
  }
}
