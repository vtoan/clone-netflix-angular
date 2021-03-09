import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IMovieListView } from 'src/app/interfaces/IMovieListVIew';

@Component({
  selector: 'list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css'],
})
export class ListMovieComponent {
  @Input() movieViewItem: IMovieListView;
  @ViewChild('container') container: ElementRef;
  //
  private _clientWidth: number = 0;
  private _maxScrollWidth: number = 0;
  private _indexSlide: number = 0;
  private _slideCurrent: number = 0;
  constructor() {}

  onNextSlide(): void {
    if (!this._getViewValue()) return;
    this._tranFromSlide(this._slideCurrent);
    if (this._slideCurrent == 1) return;
    this._slideCurrent--;
  }

  onBackSlide() {
    if (!this._getViewValue()) return;
    if (this._slideCurrent >= this._indexSlide + 1) {
      this._slideCurrent = this._indexSlide - 1;
      return;
    }
    this._slideCurrent++;
    this._tranFromSlide(this._slideCurrent);
  }

  private _getViewValue(): boolean {
    if (this._checkViewValue()) return true;
    console.log(this.container.nativeElement);
    this._clientWidth = this.container.nativeElement.clientWidth;
    this._maxScrollWidth = this.container.nativeElement.scrollWidth;
    this._indexSlide = Math.floor(this._maxScrollWidth / this._clientWidth);
    this._slideCurrent = this._indexSlide - 1;
    return this._checkViewValue();
  }

  private _checkViewValue(): boolean {
    if (this._clientWidth == 0 || this._maxScrollWidth == 0) return false;
    if (this._clientWidth == this._maxScrollWidth) return false;
    return true;
  }

  private _tranFromSlide(index): void {
    let val = this._maxScrollWidth - this._clientWidth * index;
    if (val <= 0) val = 0;
    this.container.nativeElement.style.transform = `translateX(-${val}px)`;
  }
}
