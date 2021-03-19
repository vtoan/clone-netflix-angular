import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'item-movie',
  templateUrl: './item-movie.component.html',
  styleUrls: ['./item-movie.component.css'],
})
export class ItemMovieComponent implements OnInit {
  @Input() itemMovie: IMovie;
  categories: string[] = [];

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.categories = this.itemMovie.subCategories.slice(0,3);
  }
  onAddBookmark(): void {}
  onLike(): void {}
  onDislike(): void {}
  onMoreDetail(): void {
    const dialogRef = this.dialog.open(MovieDetailComponent, {
      height: '95%',
      width: '900px',
      data: this.itemMovie
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
