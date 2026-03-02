import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductModel} from '../../models/product.model';
import {Product} from '../../services/product';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-product-create',
  imports: [FormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate implements OnInit {
  newProduct = new ProductModel();
  message! : string;
  categories! : CategoryModel[];
  newIdCat! : number;
  newCategory! : CategoryModel;
  constructor(private product: Product) {
  }
  createProduct(){
    // console.log(this.newProduct);
    this.newCategory = this.product.viewCategory(this.newIdCat);
    this.newProduct.category = this.newCategory;
    this.product.createProduct(this.newProduct);
    this.message = "Produit "+this.newProduct.name +" ajouté avec succès !"

  }
  ngOnInit(): void {
    this.categories = this.product.listCategories();
  }

}
