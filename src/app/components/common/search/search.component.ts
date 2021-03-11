import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Output() onQueryChange = new EventEmitter<string>();
  constructor() {}
  onKeyDown(e) {
    if (e.keyCode == 13) {
      let val = e.target.value;
      this.onQueryChange.emit(val);
    }
  }
}
