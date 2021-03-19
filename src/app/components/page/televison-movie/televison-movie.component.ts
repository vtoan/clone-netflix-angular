import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterMovie } from 'src/app/helper/usefull';
import { MovieService } from 'src/app/services/movie.service';
import { IModelListView } from '../../common/list-movie/list-movie.component';
import { ILayoutConfig } from '../../layout/main-page/main-page.component';

@Component({
  selector: 'app-televison-movie',
  templateUrl: './televison-movie.component.html',
})
export class TelevisonMovieComponent implements OnInit {
  listMovie$: Subject<IModelListView[]> = new Subject();
  layoutConfig: ILayoutConfig = {
    title: 'Phim truyen hinh',
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
      linkThumbnail: '1.jpg',
    },
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
