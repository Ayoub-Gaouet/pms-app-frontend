import {CategoryModel} from './category.model';

export class SupplierModel {
  id?: number;
  name?: string;
  taxNumber?: string;
  telephoneNumber?: string;
  address?: string;
  category!: CategoryModel;
  created_at?: Date;
  updated_at?: Date;
}
