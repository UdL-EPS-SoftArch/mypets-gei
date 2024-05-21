import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetService } from '../pet.service';
import { Pet } from '../pet';
import { PetFavouriteComponent } from '../pet-favourite/pet-favourite.component';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule,RouterModule, PetFavouriteComponent],
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
    this.fetchPet();
  }

  fetchPet(): void {
    this.petId = this.route.snapshot.params.id;
    this.petsService.getResource(this.petId)
      .subscribe({
        next: (response) => {
          this.pet = response;
        }
      });
  }
}
