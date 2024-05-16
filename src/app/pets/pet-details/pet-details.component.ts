import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetsService } from '../pets.service';
import { PetData } from '../pet-data';
@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export class PetDetailsComponent {
  public petData: PetData = new PetData();

  constructor(private petsService: PetsService,
              private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.petsService.getResource(id).subscribe(
      petData => {
        this.petData = petData;
      });
  }
}
