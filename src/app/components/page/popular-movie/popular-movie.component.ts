import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterMovie } from 'src/app/helper/usefull';
import { MovieService } from 'src/app/services/movie.service';
import { IModelListView } from '../../common/list-movie/list-movie.component';
import { ILayoutConfig } from '../../layout/main-page/main-page.component';

@Component({
  selector: 'app-popular-movie',
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.css'],
})
export class PopularMovieComponent implements OnInit {
  listMovie$: Subject<IModelListView[]> = new Subject();
  layoutConfig: ILayoutConfig = {
    title: 'Phim Moi & Pho bien',
    isLoading: true,
    isEmpty: true,
  };

  constructor(private movieSer: MovieService) {}

  ngOnInit(): void {
    Promise.all([
      this.movieSer.getByCategory(1),
      this.movieSer.getByCategory(15),
      this.movieSer.getByCategory(2),
      this.movieSer.getByCategory(5),
      this.movieSer.getByCategory(9),
    ]).then((datas) => {
      this.layoutConfig.isLoading = false;
      this.layoutConfig.isEmpty = false;
      FilterMovie(datas, this.listMovie$);
    });
  }
}
