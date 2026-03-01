import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class Product {
  products: ProductModel[]; //un tableau de Produit
  product!: ProductModel;

  constructor() {
    this.products = [
      {id: 1, name: "PC Asus", stock: 3000.600, created_at: new Date("01/14/2011"), updated_at: new Date("01/14/2011")},
      {
        id: 2,
        name: "Imprimante Epson",
        stock: 450,
        created_at: new Date("12/17/2010"),
        updated_at: new Date("12/17/2010")
      },
      {
        id: 3,
        name: "Tablette Samsung",
        stock: 900.123,
        created_at: new Date("02/20/2020"),
        updated_at: new Date("02/20/2020")
      },
    ];
  }

  listProducts(): ProductModel[] {
    return this.products;
  }

  viewProduct(id: number): ProductModel {
    this.product = this.products.find(p => p.id == id)!;
    return this.product;
  }

  createProduct(prod: ProductModel) {
    this.products.push(prod);
  }

  sortProducts() {
    this.products = this.products.sort((n1, n2) => {
      if (n1.id! > n2.id!) {
        return 1;
      }
      if (n1.id! < n2.id!) {
        return -1;
      }
      return 0;
    });
  }

  updateProduct(p: ProductModel) {
    // console.log(p);
    this.deleteProduct(p);
    this.createProduct(p);
    this.sortProducts();
  }

  deleteProduct(productModel: ProductModel) {
    const index = this.products.indexOf(productModel, 0);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }
}
