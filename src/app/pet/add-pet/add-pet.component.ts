import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { PetService } from '../pet.service';
import { Router } from "@angular/router";
import {Pet} from "../pet";

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent {
  pet: Pet = new Pet(); // Create a new instance of Pet

  constructor(private petService: PetService, private router: Router) {}

  cancelClicked() {
    this.router.navigateByUrl("/about");
  }

  addPet(): void {
    if (!this.pet.name || !this.pet.color || !this.pet.size || !this.pet.weight || !this.pet.age || !this.pet.breed || !this.pet.description) {
      alert('Please fill out all fields!');
      return;
      }
    this.petService.addPet(this.pet).subscribe(
        (response) => {
          alert("Pet added successfully");
          this.pet = new Pet();
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding pet:', error);
          if (error.error && error.error.message) {
            console.error('Server error message:', error.error.message);
          }
          alert('Something went wrong; please try again later.');
        }
    );
  }
}
