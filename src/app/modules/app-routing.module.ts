import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryMovieComponent } from '../components/page/category-movie/category-movie.component';
import { ErrorComponent } from '../components/page/error/error.component';
import { FeatureMovieComponent } from '../components/page/feature-movie/feature-movie.component';
import { HomeComponent } from '../components/page/home/home.component';
import { MovieComponent } from '../components/page/movie/movie.component';
import { MyMovieComponent } from '../components/page/my-movie/my-movie.component';
import { PopularMovieComponent } from '../components/page/popular-movie/popular-movie.component';
import { SearchResultComponent } from '../components/page/search-result/search-result.component';
import { TelevisonMovieComponent } from '../components/page/televison-movie/televison-movie.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'televison-movie', component: TelevisonMovieComponent },
  { path: 'feature-movie', component: FeatureMovieComponent },
  { path: 'my-movie', component: MyMovieComponent },
  { path: 'popular-movie', component: PopularMovieComponent },
  { path: 'category-movie/:id', component: CategoryMovieComponent },
  { path: 'search-result/:query', component: SearchResultComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
