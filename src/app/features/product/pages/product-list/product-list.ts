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
  products: ProductModel[] = [];

  constructor(private product: Product) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.product.listProducts().subscribe(prods => {
      console.log(prods);
      this.products = prods;
    });
  }

  deleteProduct(p: ProductModel) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.product.deleteProduct(p.id!).subscribe(() => {
        console.log("produit supprimé");
        this.loadProducts();
      });
  }
}
