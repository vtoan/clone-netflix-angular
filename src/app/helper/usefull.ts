import { Subject } from 'rxjs';
import { IModelListView } from '../components/common/list-movie/IModelListView';

export function copyObject(src) {
  let json = JSON.stringify(src);
  return JSON.parse(json);
}

export function FilterMovie(datas: any[], observer$: Subject<any>): void {
  let mv: IModelListView[] = [];
  datas.forEach((item) => {
    let category = item[0];
    mv.push({
      id: category.id,
      title: category.name,
      movies: item[1],
    });
  });
  observer$.next(mv);
}

export function ToModelListView(data: any): IModelListView {
  let category = data[0];
  return {
    id: category.id,
    title: category.name,
    movies: data[1],
  };
}

