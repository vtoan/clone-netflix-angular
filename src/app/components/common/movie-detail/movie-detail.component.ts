import { Component, OnInit } from '@angular/core';
import {IActor} from '../../../interfaces/IActor';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  actors: IActor[] = [
    {
      id: '1',
      name: 'Sonequa Martin-Green',
    },
    {
      id: '1',
      name: 'Doug Jones',
    },
    {
      id: '1',
      name: 'Anthony Rapp',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  onPlay(): void {}

  onAddBookmark(): void {}
  onLike(): void {}
  onDislike(): void {}
  onMute(): void {}
}
