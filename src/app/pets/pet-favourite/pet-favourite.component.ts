import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PetData } from '../pet-data';
import { PetsService } from '../pets.service';
import { UserService } from '../../user/user.service';
import { User } from '../../login-basic/user';
import { Pet } from '../pet';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';
import { HttpClient } from '@angular/common/http';
import { FavouritedPets } from '../favourited-pets';

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
  userService: UserService = inject(UserService)
  petData: PetData | undefined;
  isClicked: Boolean = false;
  user: User = new User();
  pet:Pet = new Pet();
  baseUrl: String = "http://localhost:8080";

  constructor(private authService: AuthenticationBasicService, 
    private router: Router,
    private http:HttpClient){
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    this.petData = this.petsService.findByID(petId.toString())[0];
  }

  ngOnInit(): void {
      //get User to fill their liked pets from server request
      this.user = this.authService.getCurrentUser();
      this.http.get<any>(`${this.baseUrl}/favouritedPetses`).subscribe(
        res => {
          const favPets = res._embedded.favouritedPetses;
          console.log("favPets = "+favPets);
          // Check if user in FavouritedPets pair is actual user
          favPets.forEach(
            pair=>{
              console.log("pair: "+pair);
              // When he is, add pair to user's parameter
              if (pair[0] == this.user.username){
                this.user.favouritedPets.push(new FavouritedPets(pair))
              }
          });
        }
      )       
      //visually show if pet is liked or disliked by user
      for (var i=0; i < this.user.favouritedPets.length; i++){
        if(this.petData.id === this.user.favouritedPets[i].petId){
          this.isClicked = true
          break
        }
      }
      if (this.isClicked){
        this.text = "💔"
      } else{
        this.text = "❤"
      }
  }

  onClick(){
    // Visual update
    this.isClicked = !this.isClicked
    if (this.isClicked){
      this.text = "💔"
    } else{
      this.text = "❤"
    }
    // Backend update
    this.updateFavourite(this.user, this.pet);
  }

  updateFavourite(user: User, pet: Pet){
    let found = false;
    let foundEntry= new FavouritedPets();
    user.favouritedPets.forEach(
      pair=>{
        if ((pair.petId == pet.id) || found){
          found = true;
          foundEntry = new FavouritedPets();
        }
    });

    if (found){
      // perform patch(?) removing entry
      // maybe findByUserIdAndPetId, then get id, then delete base/favouritedPetses/id? that what was done on the features idk
      this.http.post<any>(`${this.baseUrl}/favouritedPetses`, {foundEntry}).subscribe(
        res=>{
          console.log(res);
      });
    } else {
      //perform patch adding just new entry
      const newPair = {userId: user.username, petId: 1};
      const newEntry = new FavouritedPets(newPair);
      console.log("newEntryPetId="+newEntry.petId+"\nnewEntryUserId="+newEntry.userId);
      this.http.post<any>(`${this.baseUrl}/favouritedPetses`, {newEntry}).subscribe(
        res=>{
          console.log(res);
      });
    }
  }

  // addFavourite(): void {
  //   this.userService.getResource(this.user.username).subscribe(
  //     (user) => {
  //       this.petsService.getResource(this.petData.id).subscribe(
  //         (pet) => { 
  //           const newPair = [user.username, pet.id];
  //           this.userService.patchResource(user).subscribe(
  //             (updatedUser: User) => {
  //               console.log('Volunteer Updated:', updatedUser);
  //               //this.router.navigate(['shelters', this.shelterId, 'volunteers']);
  //             },
  //             (error) => {
  //               console.error('Error updating volunteer:', error);
  //             }
  //           );
  //         },
  //         (error) => {
  //           console.error('Error retrieving volunteer:', error);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.error('Error retrieving shelter:', error);
  //     }
  //   );
  // }
}
