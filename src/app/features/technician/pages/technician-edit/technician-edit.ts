import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnicianService } from '../../services/technician';
import { TechnicianModel } from '../../models/technician.model';
import { SkillModel } from '../../models/skill.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MachineService } from '../../../machine/services/machine';
import { MachineModel } from '../../../machine/models/machine.model';

@Component({
  selector: 'app-technician-edit',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './technician-edit.html',
  styles: ``,
})
export class TechnicianEdit implements OnInit {
  currentTechnician = new TechnicianModel();

  skills = signal<SkillModel[]>([]);
  machines = signal<MachineModel[]>([]);
  updatedSkillId!: number;
  updatedMachineId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private technicianService: TechnicianService,
    private machineService: MachineService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.technicianService.listSkills().subscribe((skills) => {
      this.skills.set(skills);
    });
    this.machineService.listMachines().subscribe((machines) => {
      this.machines.set(machines);
    });
    this.technicianService
      .viewTechnician(this.activatedRoute.snapshot.params['id'])
      .subscribe((tech) => {
        this.currentTechnician = tech;
        this.updatedSkillId = this.currentTechnician.skillId!;
        this.updatedMachineId = this.currentTechnician.machineAssigneeId!;
      });
  }

  updateTechnician() {
    this.currentTechnician.skillId = this.updatedSkillId;
    this.currentTechnician.machineAssigneeId = this.updatedMachineId;
    this.technicianService.updateTechnician(this.currentTechnician).subscribe(() => {
      this.router.navigate(['technicians'], { queryParams: { updated: 'true' } });
    });
  }
}
