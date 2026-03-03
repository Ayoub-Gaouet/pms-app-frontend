import {Component, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductModel} from '../../models/product.model';
import {Product} from '../../services/product';
import {CategoryModel} from '../../models/category.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  imports: [FormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate implements OnInit {
  newProduct = new ProductModel();
  message!: string;
  categories = signal<CategoryModel[]>([]);
  newIdCat!: number;

  constructor(private product: Product, private router: Router
  ) {
  }


  createProduct() {
    this.newProduct.category = this.categories().find(cat => cat.id == this.newIdCat)!;
    this.product.createProduct(this.newProduct)
      .subscribe(prod => {
        console.log(prod);
        this.router.navigate(['produits']);
      });
  }


  ngOnInit(): void {
    this.product.listCategories().subscribe(cats => {
      this.categories.set(cats);
      console.log(cats);
    });
  }

}
