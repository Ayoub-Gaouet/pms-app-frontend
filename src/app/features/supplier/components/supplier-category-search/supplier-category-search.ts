import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supplier } from '../../services/supplier';
import { CategoryModel } from '../../models/category.model';
import { SupplierModel } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-category-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier-category-search.html',
  styles: ``,
})
export class SupplierCategorySearch implements OnInit {
  categories = signal<CategoryModel[]>([]);
  suppliers = signal<SupplierModel[]>([]);
  selectedCategoryId: number | null = null;

  constructor(private supplierService: Supplier) {}

  ngOnInit(): void {
    this.supplierService.listCategories().subscribe((cats: CategoryModel[]) => this.categories.set(cats));
  }

  onCategoryChange() {
    if (this.selectedCategoryId) {
      this.supplierService.searchByCategory(this.selectedCategoryId).subscribe((sups: SupplierModel[]) => this.suppliers.set(sups));
    } else {
      this.suppliers.set([]);
    }
  }
}
