import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetData } from '../pet-data';
import { PetsService } from '../pets.service';
import { UserService } from '../../user/user.service';
import { User } from '../../login-basic/user';

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
  isClicked: Boolean = false;
  user: User = new User();

  constructor(private userService: UserService){
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    this.petData = this.petsService.getPet(petId);
  }

  ngOnInit(): void {
      //get User to get their liked pets
      const id = this.route.snapshot.paramMap.get('id');
      this.userService.getResource(id).subscribe(
      user => {
        this.user = user;
      });
      //visually get if pet is liked or disliked by user
      for (var i=0; i < this.user.favouritedPets.length; i++){
        if(this.petData.id === this.user.favouritedPets[i].id){
          this.isClicked = true
          break
        }
      }
      console.log(this.user.favouritedPets)
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
