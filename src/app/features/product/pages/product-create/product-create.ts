import {Component, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductModel} from '../../models/product.model';
import {Product} from '../../services/product';
import {CategoryModel} from '../../models/category.model';
import {SupplierModel} from '../../../supplier/models/supplier.model';
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
  suppliers = signal<SupplierModel[]>([]);
  newIdCat!: number;
  newIdSupplier!: number;

  constructor(private product: Product, private router: Router
  ) {
  }


  createProduct() {
    if (this.newProduct.stock == null || this.newProduct.stock <= 0) {
      this.message = 'La quantité du produit doit être supérieure à 0';
      return;
    }
    this.newProduct.categoryId = this.newIdCat;
    this.newProduct.supplierId = this.newIdSupplier;
    this.product.createProduct(this.newProduct)
      .subscribe(prod => {
        console.log(prod);
        this.router.navigate(['products'], { queryParams: { created: 'true' } });
      });
  }


  ngOnInit(): void {
    this.product.listCategories().subscribe(cats => {
      this.categories.set(cats);
    });
    this.product.listSuppliers().subscribe(suppliers => {
      this.suppliers.set(suppliers);
    });
  }

}
