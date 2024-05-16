import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetsService } from '../pets.service';
import { PetData } from '../pet-data';
import { PetFavouriteComponent } from '../pet-favourite/pet-favourite.component';
@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule,RouterModule,PetFavouriteComponent],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export class PetDetailsComponent {
  public petData: PetData = new PetData();

  constructor(private petsService: PetsService,
              private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.fetchPet()
  }

  fetchPet(): void {
    this.petsService.getResource(this.route.snapshot.params.id)
      .subscribe({
        next: (response) => {
          this.petData = response;
        }
      });
  }
}
