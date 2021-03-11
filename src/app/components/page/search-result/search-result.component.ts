import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieService } from 'src/app/services/movie.service';
import { ILayoutConfig } from '../../layout/main-page/main-page.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
})
export class SearchResultComponent implements OnInit {
  listMovie: IMovie[] = [];
  layoutConfig: ILayoutConfig = {
    title: 'Ket qua tim kiem',
    isLoading: true,
    isEmpty: true,
  };

  constructor(private movieSer: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const query = this.route.snapshot.paramMap.get("query");
    this.layoutConfig.title+=" - ' "+query+" '";

    this.movieSer.getAll().then((data) => {
      this.layoutConfig.isLoading = false;
      this.layoutConfig.isEmpty = data.length == 0;
      this.listMovie = data;
    });
  }
}
