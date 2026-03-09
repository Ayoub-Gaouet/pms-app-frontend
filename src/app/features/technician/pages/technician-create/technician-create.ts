import { Component, OnInit, signal } from '@angular/core';
import { TechnicianService } from '../../services/technician';
import { TechnicianModel } from '../../models/technician.model';
import { SkillModel } from '../../models/skill.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MachineService } from '../../../machine/services/machine';
import { MachineModel } from '../../../machine/models/machine.model';

@Component({
  selector: 'app-technician-create',
  templateUrl: './technician-create.html',
  styles: ``,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TechnicianCreate implements OnInit {
  newTechnician = new TechnicianModel();
  skills = signal<SkillModel[]>([]);
  machines = signal<MachineModel[]>([]);
  skillId?: number;
  machineId?: number;
  message = '';

  constructor(
    private technicianService: TechnicianService,
    private machineService: MachineService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.technicianService.listSkills().subscribe(skills => this.skills.set(skills));
    this.machineService.listMachines('AVAILABLE').subscribe(machines => this.machines.set(machines));
  }

  createTechnician() {
    if (!this.skillId) {
      this.message = 'Veuillez sélectionner une compétence.';
      return;
    }
    this.newTechnician.skillId = this.skillId;
    if (this.machineId) {
      this.newTechnician.machineAssigneeId = this.machineId;
    }
    this.technicianService.createTechnician(this.newTechnician).subscribe({
      next: () => {
        this.router.navigate(['technicians'], { queryParams: { created: 'true' } });
      },
      error: () => {
        this.message = 'Erreur lors de la création du technicien';
      }
    });
  }
}
