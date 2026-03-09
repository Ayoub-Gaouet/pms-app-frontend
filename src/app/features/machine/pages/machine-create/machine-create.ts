import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine';
import { MachineModel } from '../../models/machine.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-machine-create',
    templateUrl: './machine-create.html',
    styles: ``,
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class MachineCreate implements OnInit {
    newMachine = new MachineModel();
    message = '';
    etats = ['AVAILABLE', 'DOWN', 'IN_MAINTENANCE'];

    constructor(private machineService: MachineService, private router: Router) { }

    ngOnInit(): void {
        this.newMachine.etat = 'AVAILABLE';
    }

    createMachine() {
        this.machineService.createMachine(this.newMachine).subscribe({
            next: () => {
                this.router.navigate(['machines'], { queryParams: { created: 'true' } });
            },
            error: () => {
                this.message = 'Erreur lors de la création de la machine';
            }
        });
    }
}
