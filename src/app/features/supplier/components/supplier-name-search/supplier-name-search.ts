import { Component, OnInit, signal } from '@angular/core';
import { Supplier } from '../../services/supplier';
import { SupplierModel } from '../../models/supplier.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-name-search',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './supplier-name-search.html',
  styles: ``,
})
export class SupplierNameSearch implements OnInit {
  searchTerm: string = '';
  suppliers = signal<SupplierModel[]>([]);
  searching = false;

  constructor(private supplierService: Supplier) {}

  ngOnInit(): void {}

  onSearch() {
    this.searching = true;
    this.supplierService.searchByName(this.searchTerm).subscribe((sups: SupplierModel[]) => {
      this.suppliers.set(sups);
      this.searching = false;
    });
  }
}
