export interface IMovie {
  id?: number;
  name?: string;
  description?: string;
  linkMovie?: string;
  linkTrailer?: string;
  linkThumbnail?: string;
  year?: number;
  time?: string;
  ages?: number;
  likes?: number;
  dislikes?: number;
  translators?: string[];
  directors?: string[];
  actors?: string[];
  subCategories?: string[];
  category?:number;
  type?: number;
}
