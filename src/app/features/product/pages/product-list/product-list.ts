import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../models/product.model';
import {DatePipe} from '@angular/common';
import {Product} from '../../services/product';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: ProductModel[]; //un tableau de chînes de caractères
  constructor(private product: Product) {
    this.products = product.listProducts();
  }

  deleteProduct(productModel: ProductModel) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) this.product.deleteProduct(productModel);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
