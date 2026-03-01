import { Component, OnInit } from '@angular/core';
import {ProductModel} from '../../models/product.model';
import {DatePipe} from '@angular/common';
import {Product} from '../../services/product';

@Component({
  selector: 'app-product-list',
  imports: [
    DatePipe
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  produits : ProductModel[]; //un tableau de chînes de caractères
  constructor(private product: Product) {
    this.produits = product.listProducts();
    // this.produits = [
    //   { id : 1,  name : "PC Asus", stock : 3000.600, created_at : new Date("01/14/2011"),updated_at : new Date("01/14/2011")},
    //   { id : 2,  name : "Imprimante Epson", stock : 450, created_at : new Date("12/17/2010"),updated_at : new Date("12/17/2010")},
    //   { id : 3,  name :"Tablette Samsung", stock : 900.123, created_at : new Date("02/20/2020"),updated_at : new Date("02/20/2020")},
    // ];
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}
