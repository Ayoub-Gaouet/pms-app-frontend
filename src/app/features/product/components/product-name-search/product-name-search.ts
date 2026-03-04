import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductModel} from '../../models/product.model';
import {Product} from '../../services/product';

@Component({
  selector: 'app-product-name-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-name-search.html',
  styles: ``
})
export class ProductNameSearch implements OnInit {
  products = signal<ProductModel[]>([]);
  productName: string = '';

  constructor(private productService: Product) {}

  ngOnInit(): void {
    this.productService.listProducts().subscribe(prods => {
      this.products.set(prods);
      console.log('Produits chargés:', prods);
    });
  }

  searchProds(): void {
    if (this.productName && this.productName.trim() !== '') {
      this.productService.searchByName(this.productName.trim()).subscribe(prods => {
        this.products.set(prods);
        console.log('Résultats recherche par nom:', prods);
      });
    } else {
      this.productService.listProducts().subscribe(prods => {
        this.products.set(prods);
        console.log('Tous les produits:', prods);
      });
    }
  }
}
