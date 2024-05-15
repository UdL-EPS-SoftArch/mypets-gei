import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetData } from '../pet-data';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-pet-favourite',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pet-favourite.component.html',
  styleUrl: './pet-favourite.component.scss'
})
export class PetFavouriteComponent implements OnInit {
  text: string = "Like pet"
  route: ActivatedRoute = inject(ActivatedRoute);
  petsService: PetsService = inject(PetsService);
  petData: PetData | undefined;
  isClicked: Boolean;

  constructor(){
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    this.petData = this.petsService.getPet(petId);
  }

  ngOnInit(): void {
      //visually get if pet is liked or disliked by user
      this.isClicked = this.petData.favouritedByUser;
      if (this.isClicked){
        this.text = "💔"
      } else{
        this.text = "❤"
      }
  }

  onClick(){
    //Visual
    this.isClicked = !this.isClicked
    if (this.isClicked){
      this.text = "💔"
    } else{
      this.text = "❤"
    }
    //Caldrà updatejar al backed el fet que el user té o no el pet likejat
  }

}
