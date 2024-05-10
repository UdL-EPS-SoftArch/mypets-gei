import { CommonModule } from '@angular/common';
import {Component, inject} from '@angular/core';
import { PetComponent } from '../pet/pet.component';
import { PetData } from '../pet-data';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-pets-grid',
  standalone: true,
  templateUrl: './pets-grid.component.html',
  styleUrls: ['./pets-grid.component.css'],
  imports: [CommonModule,PetComponent]
})
export class PetsGridComponent {
  
  petsList: PetData[] = [];
  petsService: PetsService = inject(PetsService);
  
  constructor() {
    this.petsList = this.petsService.getAllPets();
   }

}
