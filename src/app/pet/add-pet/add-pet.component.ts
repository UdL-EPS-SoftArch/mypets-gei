import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Pet } from '../pet';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent {
  pet: Pet = new Pet(); // Create a new instance of Pet

  constructor(private petService: PetService, private router: Router) {}

  cancelClicked() {
    this.router.navigateByUrl("/pets-grid");
  }

  addPet(): void {
    if (!this.pet.name || !this.pet.color || !this.pet.size || !this.pet.weight || !this.pet.age ||
      !this.pet.breed || !this.pet.description) {
      alert('Please fill out all fields!');
      return;
    }
    const imagePattern = /^(http:\/\/|https:\/\/).*\/.*\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i;
    if(!imagePattern.test(this.pet.img)) {
      alert("Please enter a valid image URL");
      return;
    }
    this.petService.createResource({ body: this.pet }).subscribe(
      (response) => {
        this.router.navigateByUrl("/pets-grid");
      });
  }

  areFieldsEmpty(): boolean {
    return !this.pet.name ||
      !this.pet.color ||
      !this.pet.size ||
      !this.pet.weight ||
      !this.pet.age ||
      !this.pet.breed ||
      !this.pet.description ||
      !this.pet.img;
  }
}
