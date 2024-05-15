import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pet-favourite',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pet-favourite.component.html',
  styleUrl: './pet-favourite.component.scss'
})
export class PetFavouriteComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
      
  }

  onClick(){
    console.log("clicked button")
  }

}
