import {CategoryModel} from './category.model';

export class SupplierModel {
  id?: number;
  name?: string;
  taxNumber?: string;
  telephoneNumber?: string;
  address?: string;
  category!: CategoryModel;

}
