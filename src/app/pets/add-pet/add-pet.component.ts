import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { PetData } from '../pet-data';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent {
  pet: PetData = new PetData(); // Create a new instance of Pet

  constructor(private petService: PetsService, private router: Router) {}

  cancelClicked() {
    this.router.navigateByUrl("/pets-grid");
  }

  addFakePet(): void {
    const fakePet = new PetData({
      name: 'Fake Pet',
      color: 'Black',
      size: 'Medium',
      weight: 10,
      age: '1 year',
      description: 'This is a fake pet.',
      breed: 'Fake',
       // Replace shelterId with the actual ID of the shelter
      img: 'https://images.pexels.com/photos/11499392/pexels-photo-11499392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    });
    this.petService.createResource({ body: fakePet })
      .subscribe({
        next: (response) => {
          alert("Fake pet added successfully");
          this.pet = new PetData();
        }
      });
  }
  

  addPet(): void {
    if (!this.pet.name || !this.pet.color || !this.pet.size || !this.pet.weight || !this.pet.age || !this.pet.breed || !this.pet.description) {
      alert('Please fill out all fields!');
      return;
    }
    /*
    this.petService.addPet(this.pet).subscribe(
        (response) => {
          alert("Pet added successfully");
          this.pet = new PetData();
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding pet:', error);
          if (error.error && error.error.message) {
            console.error('Server error message:', error.error.message);
          }
          alert('Something went wrong; please try again later.');
        }
    );
    */
  }
}
