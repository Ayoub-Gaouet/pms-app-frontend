import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SupplierModel} from '../../models/supplier.model';
import {Supplier} from '../../services/supplier';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-supplier-edit',
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './supplier-edit.html',
  styles: ``,
})
export class SupplierEdit implements OnInit {
  currentSupplier = new SupplierModel();

  categories = signal<CategoryModel[]>([]);
  updatedCatId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private supplier: Supplier,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.supplier.listCategories().subscribe((cats) => {
      this.categories.set(cats);
      console.log(cats);
    });
    this.supplier
      .viewSupplier(this.activatedRoute.snapshot.params['id'])
      .subscribe((sup) => {
        this.currentSupplier = sup;
        this.updatedCatId = this.currentSupplier.categoryId!;
      });
  }

  updateSupplier() {
    const supplierRequest = {
      name: this.currentSupplier.name,
      tax_number: this.currentSupplier.tax_number,
      telephone_number: this.currentSupplier.telephone_number,
      address: this.currentSupplier.address,
      categoryId: this.updatedCatId
    };
    this.supplier.updateSupplier(this.currentSupplier.id!, supplierRequest).subscribe(() => {
      this.router.navigate(['suppliers'], { queryParams: { updated: 'true' } });
    });
  }
}
