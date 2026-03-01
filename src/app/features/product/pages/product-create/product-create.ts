import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductModel} from '../../models/product.model';
import {Product} from '../../services/product';

@Component({
  selector: 'app-product-create',
  imports: [FormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate implements OnInit {
  newProduct = new ProductModel();
  message! : string;

  constructor(private product: Product) {
  }
  createProduct(){
    // console.log(this.newProduct);
    this.product.createProduct(this.newProduct);
    this.message = "Produit "+this.newProduct.name +" ajouté avec succès !"

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
