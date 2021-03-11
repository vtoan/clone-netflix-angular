import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IModelListView } from '../list-movie/list-movie.component';

@Component({
  selector: 'view-list',
  templateUrl: './view-list.component.html',
})
export class ViewListComponent implements OnInit {
  @Input() datas: Observable<IModelListView[]>;
  constructor() {}
  ngOnInit(): void {
    this.datas.subscribe((val) => console.log(val));
  }
}
