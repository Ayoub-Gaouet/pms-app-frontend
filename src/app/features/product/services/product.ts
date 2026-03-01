import { Injectable } from '@angular/core';
import {ProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class Product {
  products : ProductModel[]; //un tableau de Produit
  constructor() {
    this.products = [
      { id : 1,  name : "PC Asus", stock : 3000.600, created_at : new Date("01/14/2011"),updated_at : new Date("01/14/2011")},
      { id : 2,  name : "Imprimante Epson", stock : 450, created_at : new Date("12/17/2010"),updated_at : new Date("12/17/2010")},
      { id : 3,  name :"Tablette Samsung", stock : 900.123, created_at : new Date("02/20/2020"),updated_at : new Date("02/20/2020")},
    ];
  }

  listProducts():ProductModel[] {
    return this.products;
  }

  createProduct( prod: ProductModel){
    this.products.push(prod);
  }
}
