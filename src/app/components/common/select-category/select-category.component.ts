import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/ICategory';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css'],
})
export class SelectCategoryComponent implements OnInit {
  categories: ICategory[];

  constructor(private movieSer: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieSer.getCategories().then((result) => {
      this.categories = result;
    });
  }

  onChangeValue(event): void {
    let val = event.target.value;
    this.router.navigateByUrl('/category-movie/' + val);
  }
}
