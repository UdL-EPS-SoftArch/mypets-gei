import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PetData } from '../pet-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent {
  @Input() petData!: PetData;
  petId: number | null = null;
  getPetId() {
    console.log("id",this.petData.id);
    return this.petData.id;
  }
  
  extractNumberFromUri(uri: string): void {
  const regex = /\/pets\/(\d+)/; // Regular expression to match digits after '/pets/'
  const match = uri.match(regex); // Matching the URI with the regular expression

    if (match && match.length > 1) {
      this.petId = +match[1] // Extracting the number part and converting it to a number
    } else {
      // Handling case where the URI format doesn't match expected pattern
      console.error("URI format doesn't match expected pattern.");
    }
  } 
  ngOnInit(): void {
    this.extractNumberFromUri(this.petData.uri);
    console.log("petId",this.petId);
  }
}