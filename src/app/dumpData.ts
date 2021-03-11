import { copyObject } from './helper/usefull';
import { IMovie } from './interfaces/IMovie';

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


const dumpMovie: IMovie = {
  name: '',
  description:
    'Trong chuyện có thật đã tạo cảm hứng cho Moby Dick này, đoàn thủy thủ săn cá voi ở New England đã chống chọi trong tuyệt vọng khi bị một con cá voi khổng lồ húc lật tàu.',
  linkMovie:
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
  linkTrailer:
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
  linkThumbnail: '',
  year: 1999,
  time: '1h30p',
  ages: 16,
  likes: 0,
  dislikes: 0,
  translators: ['Charles Leavitt', 'Rick Jaffa', 'Amanda Silver'],
  directors: ['Ron Howard'],
  actors: [
    'Chris Hemsworth',
    'Benjamin Walker',
    'Benjamin Walker',
    'Cillian Murphy',
    'Tom Holland',
    'Brendan Gleeson',
    'Ben Whishaw',
    'Michelle Fairley',
  ],
  subCategories: [],
  category: 0,
  type: 0,
};

const moiveNameAr: string[] = [
  'the chien z',
  'lon don that thu',
  'doi truong my',
  'wonder woman',
  'the walking dead',
  'nguoi sat 1',
  'qua nhanh qua nguy hiem: hobb va shaw',
  'sieu thu cuong no',
  'nguoi van chuyen',
  'cong vien ky jura',
  'deadpool',
  'cuoc chien giua cac vi sau',
];

const typeAr: string[] = ['phim bo', 'phim le'];

const cateAr: string[] = [
  'anime',
  'chau a',
  'gia thuong',
  'gianh giai thuong',
  'giat gan',
  'hai',
  'hai doc thoai',
  'hanh dong',
  'hollywood',
  'khoa hoc vien tuong',
  'kinh di',
  'kinh dien',
  'lang man',
  'phim am nhac & nhac kich',
  'phim chinh tri',
  'phim viet nam',
  'phim doc lap',
  'phim tai lieu',
  'the thao',
  'toi pham',
  'tre em & gia dinh',
];

export class Dump {
  private _fb;

  constructor(fb) {
    this._fb = fb;
  }

  generate(): any {
    // let gentAr = (data) => ({
    //   name: data,
    // });
    // this._initCollection('types', typeAr, gentAr);
    // this._initCollection('categories', cateAr, gentAr);
    let gent = (data) => data;
    // let movieOne = this._initMovieData(20, 1);
    // this._initCollection('movies', movieOne, gent);
    //
    let movieTwo = this._initMovieData(100, 2);
    this._initCollection('movies', movieTwo, gent);
  }

  private _getCollection(name: string): any {
    return this._fb.collection(name);
  }

  private _initCollection(collName: string, data: any[], gene: any): void {
    const collectRef = this._getCollection(collName);
    let dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
      let id = i + 1;
      collectRef
        .doc(id.toString())
        .set(gene(data[i]))
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }

  private _initMovieData(numbers, typeMovie): IMovie[] {
    let movieDump: IMovie[] = [];
    let dataLength = moiveNameAr.length;
    for (let i = 0; i < numbers; i++) {
      let idx = this._getIndex(i, dataLength);
      movieDump.push({
        ...copyObject(dumpMovie),
        ...{
          name: moiveNameAr[idx],
          linkThumbnail: idx + 1 + '.jpg',
          type: typeMovie,
          category: this._getMainCate(),
          subCategories: this._getCateName(5),
        },
      });
    }
    return movieDump;
  }

  private _getIndex(current, max) {
    if (current < max) return current;
    return this._getIndex(current - max, max);
  }

  private _getCateName(numbers: number = 3): string[] {
    let cateDump: string[] = [];
    let cateLength = cateAr.length;
    for (let i = 0; i < numbers; i++) {
      let rd = Math.floor(Math.random() * cateLength + 1);
      cateDump.push(cateAr[rd - 1]);
    }
    return cateDump;
  }

  private _getMainCate() {
    let cateLength = cateAr.length;
    let rd = Math.floor(Math.random() * cateLength + 1);
    return rd;
  }
}
