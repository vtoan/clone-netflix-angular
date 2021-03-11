import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieService } from 'src/app/services/movie.service';
import { IModelListView } from '../../common/list-movie/list-movie.component';
import { ILayoutConfig } from '../../layout/main-page/main-page.component';

@Component({
  selector: 'app-televison-movie',
  templateUrl: './televison-movie.component.html',
})
export class TelevisonMovieComponent implements OnInit {
  listMovieView: IModelListView[] = [];
  layoutConfig: ILayoutConfig = {
    title: 'Phim le',
    isLoading: true,
    isEmpty: true,
    subCategories: [
      {
        id: 1,
        name: 'ASd',
      },
      {
        id: 2,
        name: 'asdSd',
      },
    ],
    itemDisplay: {
      id: 2,
    },
  };

  constructor(private movieSer: MovieService) {}

  ngOnInit(): void {
    this.movieSer.getAll().then((data) => {
      this.layoutConfig.isLoading = false;
      this.layoutConfig.isEmpty = data.length == 0;
      this.FilterMovie(data);
    });
  }

  private FilterMovie(datas: IMovie[]): void {
    this.listMovieView.push({
      id:"2",
      title: 'Hanh dong',
      movies: datas.slice(0, 10),
    });
    this.listMovieView.push({
      id:"3",
      title: 'AC',
      movies: datas.slice(10),
    });
  }
}
