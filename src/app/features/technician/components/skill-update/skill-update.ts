import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkillModel } from '../../models/skill.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skill-update',
  imports: [FormsModule],
  templateUrl: './skill-update.html',
  styles: ``,
})
export class SkillUpdate implements OnInit {
  @Input() skill: SkillModel = new SkillModel();
  @Input() isAdd: boolean = true;
  @Output() skillUpdated = new EventEmitter<SkillModel>();

  ngOnInit(): void {
  }

  saveSkill() {
    this.skillUpdated.emit(this.skill);
  }
}
