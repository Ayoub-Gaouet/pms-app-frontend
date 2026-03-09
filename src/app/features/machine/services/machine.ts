import { Injectable } from '@angular/core';
import { MachineModel } from '../models/machine.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class MachineService {
    machines!: MachineModel[];

    constructor(private http: HttpClient) {
    }

    listMachines(etat?: string): Observable<MachineModel[]> {
        let url = environment.apiURL + "/machines";
        if (etat) {
            url += `?etat=${etat}`;
        }
        return this.http.get<MachineModel[]>(url);
    }

    viewMachine(id: number): Observable<MachineModel> {
        const url = `${environment.apiURL}/machines/${id}`;
        return this.http.get<MachineModel>(url);
    }

    createMachine(machine: MachineModel): Observable<MachineModel> {
        return this.http.post<MachineModel>(environment.apiURL + "/machines", machine, httpOptions);
    }

    updateMachine(machine: MachineModel): Observable<MachineModel> {
        return this.http.put<MachineModel>(`${environment.apiURL}/machines/${machine.id}`, machine, httpOptions);
    }

    deleteMachine(id: number) {
        const url = `${environment.apiURL}/machines/${id}`;
        return this.http.delete(url, httpOptions);
    }
}
