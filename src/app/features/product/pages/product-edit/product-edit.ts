import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../models/product.model';
import {Product} from '../../services/product';
import {FormsModule} from '@angular/forms';
import {CategoryModel} from '../../models/category.model';
import {SupplierModel} from '../../../supplier/models/supplier.model';

@Component({
  selector: 'app-product-edit',
  imports: [
    FormsModule
  ],
  templateUrl: './product-edit.html',
  styles: ``,
})
export class ProductEdit implements OnInit {
  currentProduct = new ProductModel();

  categories = signal<CategoryModel[]>([]);
  suppliers = signal<SupplierModel[]>([]);
  updatedCatId!: number;
  updatedSupplierId!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: Product,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.product.listCategories().subscribe((cats) => {
      this.categories.set(cats);
    });
    this.product.listSuppliers().subscribe((suppliers) => {
      this.suppliers.set(suppliers);
    });
    this.product
      .viewProduct(this.activatedRoute.snapshot.params['id'])
      .subscribe((prod) => {
        this.currentProduct = prod;
        this.updatedCatId = this.currentProduct.categoryId!;
        this.updatedSupplierId = this.currentProduct.supplierId!;
      });
  }

  updateProduct() {
    this.currentProduct.categoryId = this.updatedCatId;
    this.currentProduct.supplierId = this.updatedSupplierId;
    this.product.updateProduct(this.currentProduct).subscribe(() => {
      this.router.navigate(['products'], { queryParams: { updated: 'true' } });
    });
  }
}
