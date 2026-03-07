import { SkillModel } from './skill.model';

export class TechnicianModel {
  id?: number;
  nom?: string;
  skillId?: number;
  skillName?: string;
  machineAssigneeId?: number;
  machineAssigneeNom?: string;
  created_at?: Date;
  updated_at?: Date;
}
