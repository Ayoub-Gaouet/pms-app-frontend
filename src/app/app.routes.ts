import { Routes } from '@angular/router';
import { ProductList } from './features/product/pages/product-list/product-list';
import { ProductCreate } from './features/product/pages/product-create/product-create';

export const routes: Routes = [
  { path: "products", component: ProductList },
  { path: "product-create", component: ProductCreate },
  { path: "", redirectTo: "products", pathMatch: "full" }
];
