import { Component, OnInit, signal } from '@angular/core';
import { TechnicianService } from '../../services/technician';
import { SkillModel } from '../../models/skill.model';
import { DatePipe } from '@angular/common';
import {SkillUpdate} from '../../components/skill-update/skill-update';

@Component({
  selector: 'app-skill-list',
  imports: [DatePipe, SkillUpdate],
  templateUrl: './skill-list.html',
  styles: ``,
})
export class SkillList implements OnInit {
  skills = signal<SkillModel[]>([]);
  updatedSkill = signal<SkillModel>(new SkillModel());
  isAdd = signal<boolean>(true);
  successMessage = signal<string | null>(null);

  constructor(private technicianService: TechnicianService) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills() {
    this.technicianService.listSkills().subscribe(skills => this.skills.set(skills));
  }

  skillUpdated(skill: SkillModel) {
    if (this.isAdd()) {
      this.technicianService.createSkill(skill).subscribe(() => {
        this.isAdd.set(true);
        this.updatedSkill.set(new SkillModel());
        this.successMessage.set('Compétence créée avec succès !');
        setTimeout(() => this.successMessage.set(null), 4000);
        this.loadSkills();
      });
    } else {
      if (skill.id) {
        this.technicianService.updateSkill(skill).subscribe(() => {
          this.isAdd.set(true);
          this.updatedSkill.set(new SkillModel());
          this.successMessage.set('Compétence mise à jour avec succès !');
          setTimeout(() => this.successMessage.set(null), 4000);
          this.loadSkills();
        });
      }
    }
  }

  editSkill(skill: SkillModel) {
    this.updatedSkill.set({ ...skill });
    this.isAdd.set(false);
  }
}
