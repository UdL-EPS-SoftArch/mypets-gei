import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetService } from '../pet.service';
import { Pet } from '../pet';
@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export class PetDetailsComponent implements OnInit {
  public pet: Pet = new Pet();
  petId: number | null = null;


  constructor(private petsService: PetService,
              private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.fetchPet()
    this.extractNumberFromUri(this.pet.uri);
  }

  fetchPet(): void {
    this.petsService.getResource(this.route.snapshot.params.id)
      .subscribe({
        next: (response) => {
          this.pet = response;
        }
      });
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
