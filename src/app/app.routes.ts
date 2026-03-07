import {Routes} from '@angular/router';
import {ProductList} from './features/product/pages/product-list/product-list';
import {ProductCreate} from './features/product/pages/product-create/product-create';
import {ProductEdit} from './features/product/pages/product-edit/product-edit';
import {SupplierList} from './features/supplier/pages/supplier-list/supplier-list';
import {SupplierCreate} from './features/supplier/pages/supplier-create/supplier-create';
import {SupplierEdit} from './features/supplier/pages/supplier-edit/supplier-edit';
import {ProductCategorySearch} from './features/product/components/product-category-search/product-category-search';
import {ProductNameSearch} from './features/product/components/product-name-search/product-name-search';
import {ProductCategoryList} from './features/product/pages/product-category-list/product-category-list';
import {SupplierCategoryList} from './features/supplier/pages/category-list/supplier-category-list';
import {Login} from './features/auth/pages/login/login';
import {Forbidden} from './core/pages/forbidden/forbidden';
import {authGuard} from './core/guards/auth-guard';
import {adminGuard} from './core/guards/admin-guard';
import {SupplierCategorySearch} from './features/supplier/components/supplier-category-search/supplier-category-search';
import {SupplierNameSearch} from './features/supplier/components/supplier-name-search/supplier-name-search';

export const routes: Routes = [
  //Gestion des produits
  {path: "products", component: ProductList, canActivate: [authGuard]},
  {path: "product-create", component: ProductCreate, canActivate: [authGuard, adminGuard]},
  {path: "", redirectTo: "products", pathMatch: "full"},
  {path: "updateProduct/:id", component: ProductEdit, canActivate: [authGuard, adminGuard]},
  {path: 'products-category-search', component: ProductCategorySearch, canActivate: [authGuard]},
  {path: 'products-name-search', component: ProductNameSearch, canActivate: [authGuard]},

  //Gestion des catégories des produits
  {path: "product-categories",
    component: ProductCategoryList, canActivate: [authGuard]},

  //Gestion des fournisseurs
  {path: "suppliers", component: SupplierList, canActivate: [authGuard]},
  {path: "supplier-create", component: SupplierCreate, canActivate: [authGuard, adminGuard]},
  {path: "updateSupplier/:id", component: SupplierEdit, canActivate: [authGuard, adminGuard]},
  {path: "supplier-categories", component: SupplierCategoryList, canActivate: [authGuard]},
  {path: 'suppliers-category-search', component:  SupplierCategorySearch, canActivate: [authGuard]},
  {path: 'suppliers-name-search', component:  SupplierNameSearch, canActivate: [authGuard]},

  //Login
  {path: 'login', component: Login},

  //Forbidden
  {path: 'forbidden', component: Forbidden},
];
