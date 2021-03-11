import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieService } from 'src/app/services/movie.service';
import { IModelListView } from '../../common/list-movie/list-movie.component';
import { ILayoutConfig } from '../../layout/main-page/main-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listMovieView: Subject<IModelListView[]> = new Subject();
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
    hideHeading: true,
    itemDisplay: {
      id: 2,
      linkThumbnail:'1.jpg'
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
    ]).then((data) => {
      this.layoutConfig.isLoading = false;
      this.layoutConfig.isEmpty = false;
      this.FilterMovie(data);
    });
  }

  private FilterMovie(datas: any[]): void {
    let mv: IModelListView[] = [];
    datas.forEach((item) => {
      mv.push({
        id: '2',
        title: 'Hanh dong',
        movies: item,
      });
    });
    this.listMovieView.next(mv);
  }
}
