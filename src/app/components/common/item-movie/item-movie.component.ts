import { Component, Input } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'item-movie',
  templateUrl: './item-movie.component.html',
  styleUrls: ['./item-movie.component.css'],
})
export class ItemMovieComponent {
  @Input() itemMovie: IMovie;

  constructor(public dialog: MatDialog) {}

  onPlay(): void {
    const dialogRef = this.dialog.open(MovieDetailComponent, {
      height: '95%',
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onAddBookmark(): void {}
  onLike(): void {}
  onDislike(): void {}
  onMoreDetail(): void {}
}
