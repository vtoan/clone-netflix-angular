import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';

@Component({
  selector: 'list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css'],
})
export class ListMovieComponent {
  @Input() movieViewItem: IModelListView;
  @ViewChild('container') container: ElementRef;
  //
  private _clientWidth: number = 0;
  private _maxScrollWidth: number = 0;
  private _indexSlide: number = 0;
  private _slideCurrent: number = 0;
  constructor() {}

  onNextSlide(): void {
    if (!this._getViewValue()) return;
    if (this._slideCurrent <= 0) return;
    if (this._slideCurrent > this._indexSlide) this._slideCurrent--;
    this._tranFromSlide(this._slideCurrent);
    if (this._slideCurrent == 1) return;
    this._slideCurrent--;
  }

  onBackSlide() {
    if (!this._getViewValue()) return;
    if (this._slideCurrent >= this._indexSlide + 1) {
      this._slideCurrent = this._indexSlide;
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
    this._slideCurrent = this._indexSlide;
    return this._checkViewValue();
  }

  private _checkViewValue(): boolean {
    if (this._clientWidth == 0 || this._maxScrollWidth == 0) return false;
    if (this._clientWidth == this._maxScrollWidth) return false;
    return true;
  }

  private _tranFromSlide(index): void {
    console.log(index);
    console.log(this._maxScrollWidth);
    console.log(this._clientWidth);
    let val = this._maxScrollWidth - (this._clientWidth * index - 52);
    console.log(val);
    if (val <= 0) val = 0;
    this.container.nativeElement.style.transform = `translateX(-${val}px)`;
  }
}
export interface IModelListView {
  title: string;
  movies: IMovie[];
  id: string;
}
