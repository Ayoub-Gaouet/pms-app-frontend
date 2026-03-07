import {Component, OnInit, signal} from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {Supplier} from '../../services/supplier';
import {CategoryUpdate} from '../../components/category-update/category-update';

@Component({
  selector: 'app-supplier-category-list',
  imports: [CategoryUpdate],
  templateUrl: './supplier-category-list.html',
})
export class SupplierCategoryList implements OnInit {
  categories = signal<CategoryModel[]>([]);
  updatedCategory = signal<CategoryModel>(new CategoryModel());
  isAdd = signal<boolean>(true);
  successMessage = signal<string | null>(null);

  constructor(private supplierService: Supplier) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.supplierService.listCategories().subscribe(cats => {
      this.categories.set(cats);
      console.log('Catégories chargées :', cats);
    });
  }

  categoryUpdated(cat: CategoryModel) {
    if (this.isAdd()) {
      this.supplierService.createCategory(cat).subscribe(() => {
        this.isAdd.set(true);
        this.updatedCategory.set(new CategoryModel());
        this.successMessage.set('Catégorie créée avec succès !');
        setTimeout(() => this.successMessage.set(null), 4000);
        this.loadCategories();
      });
    } else {
      this.supplierService.updateCategory(cat).subscribe(() => {
        this.isAdd.set(true);
        this.updatedCategory.set(new CategoryModel());
        this.successMessage.set('Catégorie mise à jour avec succès !');
        setTimeout(() => this.successMessage.set(null), 4000);
        this.loadCategories();
      });
    }
  }

  editCategory(cat: CategoryModel) {
    this.updatedCategory.set({...cat});
    this.isAdd.set(false);
  }
}
