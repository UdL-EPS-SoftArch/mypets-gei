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

  constructor(private petsService: PetService,
              private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.fetchPet()
  }

  fetchPet(): void {
    this.petsService.getResource(this.route.snapshot.params.id)
      .subscribe({
        next: (response) => {
          this.pet = response;
        }
      });
  }
}
