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
  filteredPetsList: PetData[] = [];

  constructor() {
    this.petsService.getAllPets().then((petsList:PetData[]) => {
      this.petsList = petsList;
      this.filteredPetsList = petsList;
    });
   }

   filterResultsByName(name: string) {
    if (name === "") {
      this.filteredPetsList = this.petsList;
    } else {
      this.filteredPetsList = this.petsList.filter(pet => {
        return pet.name.toLowerCase().includes(name.toLowerCase());
      });
    }
  }  
  
}
