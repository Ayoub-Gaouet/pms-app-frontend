import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../models/product.model';
import {Product} from '../../services/product';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-product-edit',
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './product-edit.html',
  styles: ``,
})
export class ProductEdit implements OnInit {
  currentProduct = new ProductModel();

  categories! : CategoryModel[];
  updatedCatId! : number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: Product,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.categories = this.product.listCategories();
    this.currentProduct = this.product.viewProduct(this.activatedRoute.snapshot.params['id'])
    this.updatedCatId=this.currentProduct.category.id;

  }

  updateProduct() { //console.log(this.currentProduit);
    this.currentProduct.category=this.product.viewCategory(this.updatedCatId);
    this.product.updateProduct(this.currentProduct);
    this.router.navigate(['products']);
  }


}
