import { Injectable } from '@angular/core';
import { ConnectDbService } from './connect-db.service';
import { IMovie } from '../interfaces/IMovie';
import { ToastrService } from 'ngx-toastr';
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
        this.toastr.error(err, 'Error getting document:');
        return null;
      });
  }

  // private _checkExist(collectionName, id): Promise<any> {
  //   return this._storage
  //     .collection(collectionName)
  //     .doc(id)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) return Promise.resolve();
  //       this.toastr.error(`${collectionName} with id: '${id}' not exist`);
  //       return Promise.reject();
  //     });
  // }

  // private _getBy(collectName, id, compare: string = 'array-contains'): any {
  //   // return this._checkExist(collectName, id).then(() =>
  //   // return this._filterDoc(collectName, id, compare);
  //   // .then((data) => this.datas.next(data))
  //   // .catch(() => Promise.resolve(this.datas.next([])))
  // }

  getAll(): Promise<IMovie[]> {
    return this._movieCollection
      .get()
      .then((querySnapshot) => this._convertToMovies(querySnapshot))
      .catch((err) => {
        this.toastr.error(err, 'Error getting all movie');
        return [];
      });
  }

  getByCategory(id: any): Promise<IMovie[]> {
    return Promise.all([
      this._getCollection('categories', id + ''),
      this._filterDoc('category', id, '=='),
    ]);
  }

  getByType(id: number): Promise<IMovie[]> {
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
      });
  }
  // getByActor(id: string): Promise<IMovie[]> {
  //   return this._filterDoc('actors', id);
  // }
  // getByDirector(id: string): Promise<IMovie[]> {
  //   return this._filterDoc('directors', id);
  // }

  // getByTranslator(id: string): Promise<IMovie[]> {
  //   return this._filterDoc('translators', id);
  // }
}
