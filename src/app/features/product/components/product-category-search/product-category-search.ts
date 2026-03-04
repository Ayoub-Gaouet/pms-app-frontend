import {Component, OnInit, signal} from '@angular/core';
import {ProductModel} from '../../models/product.model';
import {CategoryModel} from '../../models/category.model';
import {CommonModule} from '@angular/common';
import {Product} from '../../services/product';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-category-search',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-category-search.html',
  styles: ``,
})
export class ProductCategorySearch implements OnInit {
  products = signal<ProductModel[]>([]);
  categories = signal<CategoryModel[]>([]);
  IdCategorie: number | null = null;

  constructor(private productService: Product) {
  }

  ngOnInit(): void {
    this.productService.listProducts().subscribe(prods => {
      this.products.set(prods);
    });
    this.productService.listCategories().subscribe(cats => {
      this.categories.set(cats);
      console.log('Catégories chargées:', cats);
    });
  }

  onChange(newId: number | null) {
    this.IdCategorie = newId;
    if (this.IdCategorie == null) {
      this.productService.listProducts().subscribe(prods => {
        this.products.set(prods);
      });
      return;
    }

    console.log("Searching for category ID:", this.IdCategorie);
    this.productService.searchByCategory(this.IdCategorie).subscribe(prods => {
      this.products.set(prods);
      console.log("Products found:", prods);
    });
  }
}


