import { Injectable } from '@angular/core';
import { ConnectDbService } from './connect-db.service';
import { IMovie } from '../interfaces/IMovie';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { copyObject } from '../helper/usefull';
//
const defaultMovie: IMovie = {
  name: 'emtpy',
  description: 'emtpy',
  linkMovie: 'emtpy',
  linkTrailer: 'emtpy',
  linkThumbnail: 'emtpy',
  year: 0,
  time: 'emtpy',
  likes: 0,
  dislikes: 0,
  translators: [],
  directors: [],
  actors: [],
  shortCategories: [],
  categories: [],
  types: [],
};
//
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  datas = new Subject<IMovie[]>();
  private _storage;
  private _movieCollection;
  constructor(private db: ConnectDbService, private toastr: ToastrService) {
    this._storage = db.getInstnace();
    this._movieCollection = this._storage.collection('movies');
  }
  private _createMovie(movie: IMovie): IMovie {
    return { ...copyObject(defaultMovie), ...movie };
  }
  private _convertToMovies(querySnapshot): IMovie[] {
    let movies: IMovie[] = [];
    querySnapshot.forEach((doc) =>
      movies.push(this._createMovie({ id: doc.id, ...doc.data() }))
    );
    return movies;
  }
  private _filterDoc(target, id): Promise<any> {
    return this._movieCollection
      .where(target, '==', id)
      .get()
      .then((doc) => this._convertToMovies(doc))
      .catch((err) => {
        this.toastr.error(err, 'Error getting document:');
        return Promise.reject();
      });
  }
  private _checkExist(collectionName, id): Promise<any> {
    return this._storage
      .collection(collectionName)
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) return Promise.resolve();
        this.toastr.error(`${collectionName} with id: '${id}' not exist`);
        return Promise.reject();
      });
  }
  private _getBy(collectName, id): any {
    return this._checkExist(collectName, id)
      .then(() => this._filterDoc(collectName, id))
      .then((data) => this.datas.next(data))
      .catch(() => this.datas.next([]));
  }
  getByActor(id: string) {
    this._getBy('actors', id);
  }
  getByDirector(id: string) {
    this._getBy('directors', id);
  }
  getByCategory(id: string) {
    this._getBy('categories', id);
  }
  getBySubCategory(id: string) {
    this._getBy('shortCategories', id);
  }
  getByTranslator(id: string) {
    this._getBy('translators', id);
  }
  getByType(id: string) {
    this._getBy('types', id);
  }
  getAll():Promise<IMovie[]> {
    return this._movieCollection
      .get()
      .then((querySnapshot) => this._convertToMovies(querySnapshot))
      .catch((err) => {
        this.toastr.error(err, 'Error getting collection');
        this.datas.next([]);
      });
  }
}
