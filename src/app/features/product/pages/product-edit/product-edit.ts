import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../models/product.model';
import {Product} from '../../services/product';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private product: Product,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.currentProduct = this.product.viewProduct(this.activatedRoute.snapshot.params['id'])
    console.log(this.currentProduct);
  }

  updateProduct() { //console.log(this.currentProduit);
    this.product.updateProduct(this.currentProduct);
    this.router.navigate(['products']);
  }


}
