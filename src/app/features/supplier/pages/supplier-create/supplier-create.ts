import {Component, OnInit, signal} from '@angular/core';
import {SupplierModel} from '../../models/supplier.model';
import {Supplier} from '../../services/supplier';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-supplier-create',
  imports: [
    FormsModule
  ],
  templateUrl: './supplier-create.html',
  styleUrl: './supplier-create.css',
})
export class SupplierCreate implements OnInit {
  newSupplier = new SupplierModel();
  message!: string;
  categories = signal<CategoryModel[]>([]);
  newIdCat!: number;

  constructor(private supplier: Supplier, private router: Router) {
  }

  createSupplier() {
    const supplierRequest = {
      name: this.newSupplier.name,
      tax_number: this.newSupplier.tax_number,
      telephone_number: this.newSupplier.telephone_number,
      address: this.newSupplier.address,
      categoryId: this.newIdCat
    };
    this.supplier.createSupplier(supplierRequest)
      .subscribe(sup => {
        console.log(sup);
        this.router.navigate(['suppliers']);
      });
  }

  ngOnInit(): void {
    this.supplier.listCategories().subscribe(cats => {
      this.categories.set(cats);
      console.log(cats);
    });
  }
}
