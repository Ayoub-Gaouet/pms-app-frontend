import {CategoryModel} from './category.model';

export class SupplierModel {
  id?: number;
  name?: string;
  tax_number?: string;
  telephone_number?: string;
  address?: string;
  category?: CategoryModel;
  categoryId?: number;
  categoryName?: string;
  created_at?: Date;
  updated_at?: Date;
}
