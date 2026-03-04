import {Component, computed, OnInit, signal} from '@angular/core';
import {ProductModel} from '../../models/product.model';
import {DatePipe} from '@angular/common';
import {Product} from '../../services/product';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Auth} from '../../../auth/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products = signal<ProductModel[]>([]);
  successMessage = signal<string | null>(null);

  inStockCount = computed(() => this.products().filter(p => (p.stock ?? 0) > 0).length);
  outOfStockCount = computed(() => this.products().filter(p => (p.stock ?? 0) === 0).length);

  constructor(private product: Product, private route: ActivatedRoute, public authService: Auth) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['created'] === 'true') {
        this.successMessage.set('Produit créé avec succès !');
        setTimeout(() => this.successMessage.set(null), 4000);
      }
      if (params['updated'] === 'true') {
        this.successMessage.set('Produit mis à jour avec succès !');
        setTimeout(() => this.successMessage.set(null), 4000);
      }
    });
    this.loadProducts();
  }

  loadProducts() {
    this.product.listProducts().subscribe(prods => {
      console.log(prods);
      this.products.set(prods);
    });
  }

  deleteProduct(p: ProductModel) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer ce produit ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.product.deleteProduct(p.id!).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'Le produit a été supprimé avec succès.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false
            });
            this.loadProducts();
          },
          error: (err) => {
            Swal.fire({
              title: 'Erreur !',
              text: 'Erreur lors de la suppression du produit.',
              icon: 'error'
            });
            console.error(err);
          }
        });
      }
    });
  }
}
