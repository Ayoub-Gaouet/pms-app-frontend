import { Routes } from '@angular/router';
import { ProductList } from './features/product/pages/product-list/product-list';
import { ProductCreate } from './features/product/pages/product-create/product-create';
import { ProductEdit } from './features/product/pages/product-edit/product-edit';
import { SupplierList } from './features/supplier/pages/supplier-list/supplier-list';
import { SupplierCreate } from './features/supplier/pages/supplier-create/supplier-create';
import { SupplierEdit } from './features/supplier/pages/supplier-edit/supplier-edit';
import { ProductCategorySearch } from './features/product/components/product-category-search/product-category-search';
import { ProductNameSearch } from './features/product/components/product-name-search/product-name-search';
import { ProductCategoryList } from './features/product/pages/product-category-list/product-category-list';
import { SupplierCategoryList } from './features/supplier/pages/category-list/supplier-category-list';
import { Login } from './features/auth/pages/login/login';
import { Forbidden } from './core/pages/forbidden/forbidden';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { SupplierCategorySearch } from './features/supplier/components/supplier-category-search/supplier-category-search';
import { SupplierNameSearch } from './features/supplier/components/supplier-name-search/supplier-name-search';
import { TechnicianList } from './features/technician/pages/technician-list/technician-list';
import { TechnicianCreate } from './features/technician/pages/technician-create/technician-create';
import { TechnicianEdit } from './features/technician/pages/technician-edit/technician-edit';
import { SkillList } from './features/technician/pages/skill-list/skill-list';
import { TechnicianSkillSearch } from './features/technician/components/technician-skill-search/technician-skill-search';
import { TechnicianNameSearch } from './features/technician/components/technician-name-search/technician-name-search';
import { MachineList } from './features/machine/pages/machine-list/machine-list';
import { MachineCreate } from './features/machine/pages/machine-create/machine-create';
import { MachineEdit } from './features/machine/pages/machine-edit/machine-edit';

export const routes: Routes = [
  //Gestion des produits
  { path: "products", component: ProductList, canActivate: [authGuard] },
  { path: "product-create", component: ProductCreate, canActivate: [authGuard, adminGuard] },
  { path: "", redirectTo: "products", pathMatch: "full" },
  { path: "updateProduct/:id", component: ProductEdit, canActivate: [authGuard, adminGuard] },
  { path: 'products-category-search', component: ProductCategorySearch, canActivate: [authGuard] },
  { path: 'products-name-search', component: ProductNameSearch, canActivate: [authGuard] },
  { path: "product-categories", component: ProductCategoryList, canActivate: [authGuard] },

  //Gestion des fournisseurs
  { path: "suppliers", component: SupplierList, canActivate: [authGuard] },
  { path: "supplier-create", component: SupplierCreate, canActivate: [authGuard, adminGuard] },
  { path: "updateSupplier/:id", component: SupplierEdit, canActivate: [authGuard, adminGuard] },
  { path: "supplier-categories", component: SupplierCategoryList, canActivate: [authGuard] },
  { path: 'suppliers-category-search', component: SupplierCategorySearch, canActivate: [authGuard] },
  { path: 'suppliers-name-search', component: SupplierNameSearch, canActivate: [authGuard] },

  //Gestion des Techniciens
  { path: "technicians", component: TechnicianList, canActivate: [authGuard] },
  { path: "technician-create", component: TechnicianCreate, canActivate: [authGuard, adminGuard] },
  { path: "updateTechnician/:id", component: TechnicianEdit, canActivate: [authGuard, adminGuard] },
  { path: "technicians-skills", component: SkillList, canActivate: [authGuard] },
  { path: "technicians-skill-search", component: TechnicianSkillSearch, canActivate: [authGuard] },
  { path: "technicians-name-search", component: TechnicianNameSearch, canActivate: [authGuard] },

  //Gestion des Machines
  { path: "machines", component: MachineList, canActivate: [authGuard] },
  { path: "machine-create", component: MachineCreate, canActivate: [authGuard, adminGuard] },
  { path: "updateMachine/:id", component: MachineEdit, canActivate: [authGuard, adminGuard] },

  //Login
  { path: 'login', component: Login },

  //Forbidden
  { path: 'forbidden', component: Forbidden },
];
