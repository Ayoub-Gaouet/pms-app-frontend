import {Component, computed, OnInit, signal} from '@angular/core';
import {SupplierModel} from '../../models/supplier.model';
import { Supplier } from '../../services/supplier';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';

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

  withCategoryCount = computed(() => this.suppliers().filter(s => s.categoryName).length);

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
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer ce fournisseur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplier.deleteSupplier(s.id!).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'Le fournisseur a été supprimé avec succès.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false
            });
            this.loadSuppliers();
          },
          error: (err) => {
            Swal.fire({
              title: 'Erreur !',
              text: 'Erreur lors de la suppression : ce fournisseur a des produits associés.',
              icon: 'error'
            });
            console.error(err);
          }
        });
      }
    });
  }

}
