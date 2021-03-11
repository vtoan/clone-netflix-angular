import { Injectable } from '@angular/core';
import { ConnectDbService } from './connect-db.service';
import { IMovie } from '../interfaces/IMovie';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { copyObject } from '../helper/usefull';
import { IType } from '../interfaces/IType';
import { Dump } from '../dumpData';
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
  // datas = new Subject<IMovie[]>();
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
        this.toastr.error(err, 'Error getting document:');
        console.log(err);
        return [];
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

  // private _getBy(collectName, id, compare: string = 'array-contains'): any {
  //   // return this._checkExist(collectName, id).then(() =>
  //   // return this._filterDoc(collectName, id, compare);
  //   // .then((data) => this.datas.next(data))
  //   // .catch(() => Promise.resolve(this.datas.next([])))
  // }

  getByActor(id: string): Promise<IMovie[]> {
    return this._filterDoc('actors', id);
  }
  getByDirector(id: string): Promise<IMovie[]> {
    return this._filterDoc('directors', id);
  }
  getByCategory(id: number): Promise<IMovie[]> {
    return this._filterDoc('category', id, '==');
  }
  getBySubCategory(id: string): Promise<IMovie[]> {
    return this._filterDoc('shortCategories', id);
  }
  getByTranslator(id: string): Promise<IMovie[]> {
    return this._filterDoc('translators', id);
  }
  getByType(id: number): Promise<IMovie[]> {
    return this._filterDoc('type', id, '==');
  }
  getAll(): Promise<IMovie[]> {
    return this._movieCollection
      .get()
      .then((querySnapshot) => this._convertToMovies(querySnapshot))
      .catch((err) => {
        this.toastr.error(err, 'Error getting collection');
        // this.datas.next([]);
      });
  }
}
