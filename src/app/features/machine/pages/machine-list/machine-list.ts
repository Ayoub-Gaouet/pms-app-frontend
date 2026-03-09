import { Component, computed, OnInit, signal } from '@angular/core';
import { MachineModel } from '../../models/machine.model';
import { DatePipe } from '@angular/common';
import { MachineService } from '../../services/machine';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Auth } from '../../../auth/services/auth';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-machine-list',
    imports: [
        DatePipe,
        RouterLink
    ],
    templateUrl: './machine-list.html',
})
export class MachineList implements OnInit {
    machines = signal<MachineModel[]>([]);
    successMessage = signal<string | null>(null);

    availableCount = computed(() => this.machines().filter(m => m.etat === 'AVAILABLE').length);
    downCount = computed(() => this.machines().filter(m => m.etat === 'DOWN').length);
    inMaintenanceCount = computed(() => this.machines().filter(m => m.etat === 'IN_MAINTENANCE').length);

    constructor(private machineService: MachineService, private route: ActivatedRoute, public authService: Auth) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['created'] === 'true') {
                this.successMessage.set('Machine créée avec succès !');
                setTimeout(() => this.successMessage.set(null), 4000);
            }
            if (params['updated'] === 'true') {
                this.successMessage.set('Machine mise à jour avec succès !');
                setTimeout(() => this.successMessage.set(null), 4000);
            }
        });
        this.loadMachines();
    }

    loadMachines() {
        this.machineService.listMachines().subscribe(macs => {
            console.log(macs);
            this.machines.set(macs);
        });
    }

    deleteMachine(m: MachineModel) {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: 'Voulez-vous vraiment supprimer cette machine ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                this.machineService.deleteMachine(m.id!).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Supprimée !',
                            text: 'La machine a été supprimée avec succès.',
                            icon: 'success',
                            timer: 3000,
                            showConfirmButton: false
                        });
                        this.loadMachines();
                    },
                    error: (err) => {
                        Swal.fire({
                            title: 'Erreur !',
                            text: 'Erreur lors de la suppression de la machine.',
                            icon: 'error'
                        });
                        console.error(err);
                    }
                });
            }
        });
    }
}
