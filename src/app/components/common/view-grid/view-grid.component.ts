import { Component, Input } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';

@Component({
  selector: 'view-grid',
  templateUrl: './view-grid.component.html',
})
export class ViewGridComponent {
  @Input() listMovie: IMovie[] = [];
  constructor() {}
}
