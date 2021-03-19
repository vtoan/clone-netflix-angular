import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMovie } from 'src/app/interfaces/IMovie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public movieItem :IMovie) {
    console.log(movieItem);
  }

  ngOnInit(): void {}
  onPlay(): void {}

  // onAddBookmark(): void {}
  onLike(): void {}
  onDislike(): void {}
  // onMute(): void {}
}
