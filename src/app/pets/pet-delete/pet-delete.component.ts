
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetsService } from '../pets.service';
import { PetData } from '../pet-data';

@Component({
  selector: 'app-pet-delete',
  standalone: true,
  imports: [],
  templateUrl: './pet-delete.component.html',
  styleUrl: './pet-delete.component.css'
})
export class PetDeleteComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  petsService: PetsService = inject(PetsService);
  petData: PetData | undefined;

  constructor() {
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    this.petData= this.petsService.getPet(petId);
  }
}
