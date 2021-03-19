import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieService } from 'src/app/services/movie.service';
import { ILayoutConfig } from '../../layout/main-page/main-page.component';

@Component({
  selector: 'app-category-movie',
  templateUrl: './category-movie.component.html',
})
export class CategoryMovieComponent implements OnInit {
  layoutConfig: ILayoutConfig = {
    title: 'Phan loai',
    isLoading: true,
    isEmpty: true,
  };
  listMovie: IMovie[] = [];
  constructor(private movieSer: MovieService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieSer.getAll().then((data) => {
      this.listMovie = data;
      this.layoutConfig.isLoading = false;
      this.layoutConfig.isEmpty = data.length == 0;
    });
  }
}
