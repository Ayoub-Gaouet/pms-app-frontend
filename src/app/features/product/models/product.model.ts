import {CategoryModel} from './category.model';

export class ProductModel {
  id? : number;
  name? : string;
  stock? : number;
  category! : CategoryModel;
  created_at? : Date;
  updated_at? : Date;
}
