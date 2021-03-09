import { Component, Input } from '@angular/core';
import { IMovieListView } from 'src/app/interfaces/IMovieListVIew';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
})
export class ViewListComponent {
  @Input() datas: IMovieListView[];
  constructor() {}
}
