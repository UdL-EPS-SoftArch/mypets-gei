import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  route: ActivatedRoute = inject(ActivatedRoute);
  petsService: PetsService = inject(PetsService);
  petData: PetData | undefined;

  constructor() 
  {
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    this.petData = this.petsService.getPet(petId);
  }

  ngOnInit():void{

  }
}