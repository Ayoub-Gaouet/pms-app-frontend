import {Routes} from '@angular/router';
import {ProductList} from './features/product/pages/product-list/product-list';
import {ProductCreate} from './features/product/pages/product-create/product-create';
import {ProductEdit} from './features/product/pages/product-edit/product-edit';
import {SupplierList} from './features/supplier/pages/supplier-list/supplier-list';
import {SupplierCreate} from './features/supplier/pages/supplier-create/supplier-create';
import {SupplierEdit} from './features/supplier/pages/supplier-edit/supplier-edit';
import {ProductCategorySearch} from './features/product/components/product-category-search/product-category-search';

export const routes: Routes = [
  //Gestion des produits
  {path: "products", component: ProductList},
  {path: "product-create", component: ProductCreate},
  {path: "", redirectTo: "products", pathMatch: "full"},
  {path: "updateProduct/:id", component: ProductEdit},
  {path: 'products-category-search', component: ProductCategorySearch},

  //Gestion des fournisseurs
  {path: "suppliers", component: SupplierList},
  {path: "supplier-create", component: SupplierCreate},
  {path: "updateSupplier/:id", component: SupplierEdit},
];
