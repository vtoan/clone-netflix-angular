import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './modules/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//service
import { ConnectDbService } from './services/connect-db.service';
//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ListMovieComponent } from './components/common/list-movie/list-movie.component';
import { MaterialUiModule } from './modules/material-ui.module';
import { ItemLoadingComponent } from './components/common/item-loading/item-loading.component';
import { ItemMovieComponent } from './components/common/item-movie/item-movie.component';
import { ThumbComponent } from './components/common/thumb/thumb.component';
import { MovieDetailComponent } from './components/common/movie-detail/movie-detail.component';
import { HomeComponent } from './components/page/home/home.component';
import { MovieComponent } from './components/page/movie/movie.component';
import { ViewListComponent } from './components/common/view-list/view-list.component';
import { ViewGridComponent } from './components/common/view-grid/view-grid.component';
import { ItemMovieRelatedComponent } from './components/common/item-movie-related/item-movie-related.component';
import { ListMovieRelatedComponent } from './components/common/list-movie-related/list-movie-related.component';
import { SearchResultComponent } from './components/page/search-result/search-result.component';
import { MyMovieComponent } from './components/page/my-movie/my-movie.component';
import { FeatureMovieComponent } from './components/page/feature-movie/feature-movie.component';
import { TelevisonMovieComponent } from './components/page/televison-movie/televison-movie.component';
import { PopularMovieComponent } from './components/page/popular-movie/popular-movie.component';
import { PerloadingComponent } from './components/common/perloading/perloading.component';
import { MainPageComponent } from './components/layout/main-page/main-page.component';
import { CategoryMovieComponent } from './components/page/category-movie/category-movie.component';
import { SearchComponent } from './components/common/search/search.component';
import { ErrorComponent } from './components/page/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListMovieComponent,
    ItemLoadingComponent,
    ItemMovieComponent,
    ThumbComponent,
    MovieDetailComponent,
    HomeComponent,
    MovieComponent,
    ViewListComponent,
    ViewGridComponent,
    ItemMovieRelatedComponent,
    ListMovieRelatedComponent,
    SearchResultComponent,
    MyMovieComponent,
    FeatureMovieComponent,
    TelevisonMovieComponent,
    PopularMovieComponent,
    PerloadingComponent,
    MainPageComponent,
    CategoryMovieComponent,
    SearchComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUiModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressAnimation: 'decreasing',
    }),
  ],
  providers: [ConnectDbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
