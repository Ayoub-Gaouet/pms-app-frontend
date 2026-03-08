import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TechnicianModel } from '../../models/technician.model';
import { TechnicianService } from '../../services/technician';

@Component({
  selector: 'app-technician-name-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technician-name-search.html',
  styles: ``,
})
export class TechnicianNameSearch implements OnInit {
  technicians = signal<TechnicianModel[]>([]);
  technicianName: string = '';

  constructor(private technicianService: TechnicianService) { }

  ngOnInit(): void {
    this.technicianService.listTechnicians().subscribe(techs => {
      this.technicians.set(techs);
      console.log('Techniciens chargés:', techs);
    });
  }

  searchTechs(): void {
    if (this.technicianName && this.technicianName.trim() !== '') {
      this.technicianService.searchByName(this.technicianName.trim()).subscribe(techs => {
        this.technicians.set(techs);
        console.log('Résultats recherche par nom:', techs);
      });
    } else {
      this.technicianService.listTechnicians().subscribe(techs => {
        this.technicians.set(techs);
        console.log('Tous les techniciens:', techs);
      });
    }
  }


}
