import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TechnicianModel } from '../../models/technician.model';
import { SkillModel } from '../../models/skill.model';
import { TechnicianService } from '../../services/technician';

@Component({
  selector: 'app-technician-skill-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technician-skill-search.html',
  styles: ``,
})
export class TechnicianSkillSearch implements OnInit {
  technicians = signal<TechnicianModel[]>([]);
  skills = signal<SkillModel[]>([]);
  IdSkill: number | null = null;

  constructor(private technicianService: TechnicianService) { }

  ngOnInit(): void {
    this.technicianService.listTechnicians().subscribe(techs => {
      this.technicians.set(techs);
    });
    this.technicianService.listSkills().subscribe(skills => {
      this.skills.set(skills);
      console.log('Compétences chargées:', skills);
    });
  }

  onChange(newId: number | null) {
    this.IdSkill = newId;
    if (this.IdSkill == null || this.IdSkill === undefined) {
      this.technicianService.listTechnicians().subscribe(techs => {
        this.technicians.set(techs);
      });
      return;
    }

    console.log("Searching for skill ID:", this.IdSkill);
    this.technicianService.searchBySkill(this.IdSkill).subscribe(techs => {
      this.technicians.set(techs);
      console.log("Technicians found:", techs);
    });
  }
}
