import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ToModelListView } from 'src/app/helper/usefull';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieService } from 'src/app/services/movie.service';
import { IModelListView } from '../../common/list-movie/list-movie.component';
import { ILayoutConfig } from '../../layout/main-page/main-page.component';

@Component({
  selector: 'banner-view',
  templateUrl: './banner-view.component.html',
})
export class BannerViewComponent implements OnInit {
  @Input() heading: boolean;
  @Input() categories: boolean;

  @Input() title: string = '';
  @Input() itemDisplay: IMovie = {
    id: 2,
    linkThumbnail: '1.jpg',
  };
  @Input() items: number[] = [];
  //
  listMovie$: Subject<IModelListView[]> = new Subject();
  listMovieRoot: IModelListView[] = [];
  layoutConfig: ILayoutConfig = {
    title: '',
    isLoading: true,
    isEmpty: true,
  };

  constructor(private movieSer: MovieService) {}

  ngOnInit(): void {
    // this.layoutConfig.isLoading = false;
    // this.layoutConfig.isEmpty = false;
    this.layoutConfig.title = this.title;
    this.layoutConfig.hideHeading = this.heading;
    this.layoutConfig.selectCategory = this.categories;
    this.layoutConfig.itemDisplay = this.itemDisplay;
    this._displayCategory(this.items);
  }

  private _displayCategory(arrCateId: number[]): void {
    arrCateId.forEach((item) => {
      this.movieSer.getByCategory(item).then((result) => {
        this.listMovieRoot.push(ToModelListView(result));
        this.listMovie$.next(this.listMovieRoot);
        this.layoutConfig.isLoading = false;
        this.layoutConfig.isEmpty = false;
      });
    });
  }
}
