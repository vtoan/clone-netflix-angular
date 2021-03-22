import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieDetailComponent } from '../../common/movie-detail/movie-detail.component';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  @Input() config: ILayoutConfig;
  constructor( public dialog: MatDialog) {}
  onMoreDetail(): void {
    const dialogRef = this.dialog.open(MovieDetailComponent, {
      height: '95%',
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
export interface ILayoutConfig {
  isLoading: boolean;
  isEmpty: boolean;
  typeLoading?: string;
  title: string;
  selectCategory?: boolean;
  hideHeading?: boolean;
  itemDisplay?: IMovie;
}
