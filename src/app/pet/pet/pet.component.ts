import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pet } from '../pet';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent implements OnInit {
  @Input() pet!: Pet;
  petId: number | null = null;

  ngOnInit(): void {
    this.extractNumberFromUri(this.pet.uri);
    console.log("petId",this.petId);
  }

  getPetId() {
    console.log("id",this.pet.id);
    return this.pet.id;
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
}
