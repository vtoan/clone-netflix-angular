import { Injectable } from '@angular/core';
import { ConnectDbService } from './connect-db.service';
import { IMovie } from '../interfaces/IMovie';
import { ToastrService } from 'ngx-toastr';
import { copyObject } from '../helper/usefull';
import { ICategory } from '../interfaces/ICategory';
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
  subCategories: [],
  category: 0,
  type: 0,
};

//
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _storage;
  private _movieCollection;
  constructor(private db: ConnectDbService, private toastr: ToastrService) {
    this._storage = db.getInstnace();
    this._movieCollection = this._storage.collection('movies');
    // let dump = new Dump(this._storage);
    // console.log(dump.generate());
    // dump.generate();
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

  private _filterDoc(
    target,
    id,
    compare: string = 'array-contains'
  ): Promise<any> {
    return this._movieCollection
      .where(target, compare, id)
      .get()
      .then((doc) => this._convertToMovies(doc))
      .catch((err) => {
        this.toastr.error(err, 'Error filter movies:');
        return [];
      });
  }

  private _getCollection(collectName: string, idDoc: string): Promise<any> {
    return this._storage
      .collection(collectName)
      .doc(idDoc)
      .get()
      .then((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        return obj;
      })
      .catch((err) => {
        this.toastr.error(err, 'Error getting collection:');
        return null;
      });
  }

  getAll(): Promise<IMovie[]> {
    return this._movieCollection
      .get()
      .then((querySnapshot) => this._convertToMovies(querySnapshot))
      .catch((err) => {
        this.toastr.error(err, 'Error getting all movie');
        return [];
      });
  }

  getByCategory(id: number): Promise<[any, IMovie[]]> {
    return Promise.all([
      this._getCollection('categories', id + ''),
      this._filterDoc('category', id, '=='),
    ]);
  }

  getByType(id: number): Promise<[any, IMovie[]]> {
    return Promise.all([
      this._getCollection('categories', id + ''),
      this._filterDoc('type', id, '=='),
    ]);
  }

  getById(id: string): Promise<IMovie> {
    return this._movieCollection
      .doc(id)
      .get()
      .then((doc) => doc.data())
      .catch((err) => {
        this.toastr.error(err, 'Error getting movie');
        return null;
      });
  }

  getCategories(): Promise<ICategory[]> {
    return this._storage
      .collection('categories')
      .get()
      .then((querySnapshot) => {
        let categories: ICategory[] = [];
        querySnapshot.forEach((doc) =>
          categories.push({ id: doc.id, ...doc.data() })
        );
        return categories;
      })
      .catch((err) => {
        this.toastr.error(err, 'Error getting categories');
        return [];
      });
  }
}
