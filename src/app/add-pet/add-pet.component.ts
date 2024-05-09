import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.scss'
})
export class AddPetComponent {
  pet: any = {};

  constructor(private http: HttpClient, private router: Router) {}

    cancelClicked() {
    this.router.navigateByUrl("/about");
    }

  addPet(): void {
    if (!this.pet.name || !this.pet.color || !this.pet.size || !this.pet.weight || !this.pet.age || !this.pet.breed || !this.pet.description) {
      alert('Please fill out all fields!');
      return;
    }

    const petData = {
      color: this.pet.color,
      size: this.pet.size,
      name: this.pet.name,
      weight: this.pet.weight,
      description: this.pet.description,
      uri: "https://example.com",
      age: this.pet.age,
      breed: this.pet.breed,
      isIn: null
    };

    this.http.post<any>('http://localhost:8080/pets', petData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error adding pet:', error);


          if (error.error && error.error.message) {
            console.error('Server error message:', error.error.message);
          }
          return throwError('Something went wrong; please try again later.');
        })
      )
      .subscribe(
        (response) => {
            this.pet = {};
            alert("Pet added successfully");
        }
      );
  }
}
