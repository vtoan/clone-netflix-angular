import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/interfaces/IMovie';
import { ISubCategory } from '../../../interfaces/ISubCategory';
import { MovieDetailComponent } from '../../common/movie-detail/movie-detail.component';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  @Input() config: ILayoutConfig;
  constructor(private router: Router, public dialog: MatDialog) {}
  onChangeValue(e) {
    let val = e.target.value;
    this.router.navigateByUrl('/category-movie/' + val);
  }
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
  subCategories?: ISubCategory[];
  hideHeading?: boolean;
  itemDisplay?: IMovie;
}
