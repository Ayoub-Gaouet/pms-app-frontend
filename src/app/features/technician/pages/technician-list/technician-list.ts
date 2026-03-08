import { Component, computed, OnInit, signal } from '@angular/core';
import { TechnicianModel } from '../../models/technician.model';
import { TechnicianService } from '../../services/technician';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../auth/services/auth';

@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.html',
  imports: [
    RouterLink,
    CommonModule
  ]
})
export class TechnicianList implements OnInit {
  technicians = signal<TechnicianModel[]>([]);
  successMessage = signal<string | null>(null);

  withSkillCount = computed(() => this.technicians().filter(t => t.skillName).length);

  constructor(private technicianService: TechnicianService, private route: ActivatedRoute, public authService: Auth) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['created'] === 'true') {
        this.successMessage.set('Technicien créé avec succès !');
        setTimeout(() => this.successMessage.set(null), 4000);
      }
      if (params['updated'] === 'true') {
        this.successMessage.set('Technicien mis à jour avec succès !');
        setTimeout(() => this.successMessage.set(null), 4000);
      }
    });
    this.loadTechnicians();
  }

  loadTechnicians() {
    this.technicianService.listTechnicians().subscribe(techs => {
      this.technicians.set(techs);
    });
  }

  deleteTechnician(t: TechnicianModel) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer ce technicien ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.technicianService.deleteTechnician(t.id!).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'Le technicien a été supprimé avec succès.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false
            });
            this.loadTechnicians();
          },
          error: (err) => {
            Swal.fire({
              title: 'Erreur !',
              text: 'Erreur lors de la suppression du technicien.',
              icon: 'error'
            });
            console.error(err);
          }
        });
      }
    });
  }
}
