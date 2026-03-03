import {Component, OnInit, signal} from '@angular/core';
import {SupplierModel} from '../../models/supplier.model';
import { Supplier } from '../../services/supplier';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';

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
  suppliers = signal<SupplierModel[]>([]);
  successMessage = signal<string | null>(null);

  constructor(private supplier: Supplier, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['updated'] === 'true') {
        this.successMessage.set('Fournisseur mis à jour avec succès !');
        setTimeout(() => this.successMessage.set(null), 4000);
      }
    });
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplier.listSuppliers().subscribe(sups => {
      console.log(sups);
      this.suppliers.set(sups);
    });
  }

  deleteSupplier(s: SupplierModel) {
    let conf = confirm("Etes-vous sûr de vouloir supprimer ce fournisseur ?");
    if (conf)
      this.supplier.deleteSupplier(s.id!).subscribe({
        next: () => {
          this.successMessage.set('Fournisseur supprimé avec succès !');
          setTimeout(() => this.successMessage.set(null), 4000);
          this.loadSuppliers();
        },
        error: (err) => {
          this.successMessage.set(null);
          alert('Erreur lors de la suppression : ce fournisseur a des produits associés.');
          console.error(err);
        }
      });
  }

}
