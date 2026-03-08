import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TechnicianModel } from '../models/technician.model';
import { SkillModel } from '../models/skill.model';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class TechnicianService {
  constructor(private http: HttpClient) { }

  listTechnicians(): Observable<TechnicianModel[]> {
    return this.http.get<TechnicianModel[]>(environment.apiURL + '/technicians');
  }

  viewTechnician(id: number): Observable<TechnicianModel> {
    return this.http.get<TechnicianModel>(`${environment.apiURL}/technicians/${id}`);
  }

  createTechnician(technician: TechnicianModel): Observable<TechnicianModel> {
    return this.http.post<TechnicianModel>(environment.apiURL + '/technicians', technician, httpOptions);
  }

  updateTechnician(technician: TechnicianModel): Observable<TechnicianModel> {
    return this.http.put<TechnicianModel>(`${environment.apiURL}/technicians/${technician.id}`, technician, httpOptions);
  }

  deleteTechnician(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}/technicians/${id}`, httpOptions);
  }

  // Gestion des skills
  listSkills(): Observable<SkillModel[]> {
    return this.http.get<SkillModel[]>(environment.apiURL + '/skills');
  }

  createSkill(skill: SkillModel): Observable<SkillModel> {
    return this.http.post<SkillModel>(environment.apiURL + '/skills', skill, httpOptions);
  }

  updateSkill(skill: SkillModel): Observable<SkillModel> {
    return this.http.put<SkillModel>(`${environment.apiURL}/skills/${skill.id}`, skill, httpOptions);
  }

  searchByName(name: string): Observable<TechnicianModel[]> {
    const url = `${environment.apiURL}/technicians/techsByName/${encodeURIComponent(name)}`;
    return this.http.get<TechnicianModel[]>(url);
  }

  searchBySkill(idSkill: number): Observable<TechnicianModel[]> {
    const url = `${environment.apiURL}/technicians/skill/${idSkill}`;
    return this.http.get<TechnicianModel[]>(url);
  }
}
