import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite-button',
  //standalone: true,
  //imports: [],
  templateUrl: './favourite-button.component.html',
  styleUrl: './favourite-button.component.scss'
})
export class FavouriteButtonComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
      
  }

  onClick(){
    console.log("clicked button")
  }

}
