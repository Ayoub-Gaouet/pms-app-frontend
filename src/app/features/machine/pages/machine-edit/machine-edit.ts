import { Component, OnInit, signal } from '@angular/core';
import { MachineService } from '../../services/machine';
import { MachineModel } from '../../models/machine.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-machine-edit',
    templateUrl: './machine-edit.html',
    styles: ``,
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class MachineEdit implements OnInit {
    currentMachine = signal<MachineModel>(new MachineModel());
    message = '';
    etats = ['AVAILABLE', 'DOWN', 'IN_MAINTENANCE'];

    constructor(
        private machineService: MachineService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        this.machineService.viewMachine(id).subscribe({
            next: (machine) => {
                this.currentMachine.set(machine);
            },
            error: () => {
                this.message = "Erreur lors du chargement de la machine";
            }
        });
    }

    updateMachine() {
        this.machineService.updateMachine(this.currentMachine()).subscribe({
            next: () => {
                this.router.navigate(['machines'], { queryParams: { updated: 'true' } });
            },
            error: () => {
                this.message = 'Erreur lors de la modification de la machine';
            }
        });
    }
}
