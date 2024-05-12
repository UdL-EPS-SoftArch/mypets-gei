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

}
