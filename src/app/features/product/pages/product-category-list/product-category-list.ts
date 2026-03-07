import {Component, OnInit, signal} from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {Product} from '../../services/product';
import {CategoryUpdate} from '../../components/category-update/category-update';

@Component({
  selector: 'app-category-list',
  imports: [CategoryUpdate],
  templateUrl: './product-category-list.html',
})
export class ProductCategoryList implements OnInit {
  categories = signal<CategoryModel[]>([]);
  updatedCategory = signal<CategoryModel>(new CategoryModel());
  isAdd = signal<boolean>(true);
  successMessage = signal<string | null>(null);

  constructor(private productService: Product) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.productService.listCategories().subscribe(cats => {
      this.categories.set(cats);
      console.log('Catégories chargées :', cats);
    });
  }

  categoryUpdated(cat: CategoryModel) {
    console.log('Category updated event', cat);
    if (this.isAdd()) {
      this.productService.createCategory(cat).subscribe(() => {
        this.isAdd.set(true);
        this.updatedCategory.set(new CategoryModel());
        this.successMessage.set('Catégorie créée avec succès !');
        setTimeout(() => this.successMessage.set(null), 4000);
        this.loadCategories();
      });
    } else {
      this.productService.updateCategory(cat).subscribe(() => {
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
