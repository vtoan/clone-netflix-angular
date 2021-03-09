import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-perloading',
  templateUrl: './perloading.component.html',
  styleUrls: ['./perloading.component.css'],
})
export class PerloadingComponent {
  @Input() isLoading: boolean = false;
  @Input() isEmpty: boolean = false;
  @Input() isSpinner: boolean = false;
  constructor() {}
}
