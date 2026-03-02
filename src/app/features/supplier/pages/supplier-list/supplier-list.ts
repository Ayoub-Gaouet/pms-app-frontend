import {Component, OnInit} from '@angular/core';
import {SupplierModel} from '../../models/supplier.model';
import { Supplier } from '../../services/supplier';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css',
})
export class SupplierList implements OnInit{
  suppliers: SupplierModel[] = [];

  constructor(private supplier: Supplier) {
  }
  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplier.listSuppliers().subscribe(sups => {
      console.log(sups);
      this.suppliers = sups;
    });
  }

  deleteSupplier(s: SupplierModel) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.supplier.deleteSupplier(s.id!).subscribe(() => {
        console.log("fournisseur supprimé");
        this.loadSuppliers();
      });
  }

}
