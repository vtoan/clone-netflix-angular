export interface IMovie {
  id?: string;
  name?: string;
  description?: string;
  linkMovie?: string;
  linkTrailer?: string;
  linkThumbnail?: string;
  year?: number;
  time?: string;
  likes?: number;
  dislikes?: number;
  translators?: string[];
  directors?: string[];
  actors?: string[];
  shortCategories?: string[];
  categories?: string[];
  types?: string[];
}
