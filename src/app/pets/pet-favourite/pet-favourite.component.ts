import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PetsService } from '../pets.service';
import { UserService } from '../../user/user.service';
import { User } from '../../login-basic/user';
import { Pet } from '../pet';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';
import { HttpClient } from '@angular/common/http';
import { FavouritedPets } from '../favourited-pets';
import { FavouritedPetsService } from '../favourited-pets.service';

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
  userService: UserService = inject(UserService);
  favPetsService: FavouritedPetsService = inject(FavouritedPetsService);
  isNowFavourited: Boolean = false;
  user: User = new User();
  pet:Pet = new Pet();
  baseUrl: String = "http://localhost:8080";
  petId:number;

  constructor(private authService: AuthenticationBasicService, 
    private router: Router,
    private http:HttpClient){}

  ngOnInit(): void {
    // Get id of pet on display
    this.petId = Number(this.route.snapshot.paramMap.get('id'));
    
    // Get current user data
    this.user = this.authService.getCurrentUser();

    // Fill user.favouritedPets from info on the backend
    // Instead of using retrieveFavourites, we'll do it directly since we need to wait for the update to take effect
    this.http.get<any>(`${this.baseUrl}/favouritedPetses`).subscribe(
      res => {
        const favPets:FavouritedPets[] = res._embedded.favouritedPetses;
        // Check if user in FavouritedPets pair is actual user
        favPets.forEach(
          pair=>{
            // When he is, add pair to user's parameter
            if (pair.userId === this.user.username){
              this.user.favouritedPets.push(new FavouritedPets({userId: pair.userId, petId: pair.petId}))
            }
        });

        // With updated values, visually show if pet is liked or disliked by user
        for (var i=0; i < this.user.favouritedPets.length; i++){
          if(this.petId === this.user.favouritedPets[i].petId){
            this.isNowFavourited = true
            break
          }
        }
        if (this.isNowFavourited){
          this.text = "💔"
        } else{
          this.text = "❤"
        }
      }
    )
  }

  onClick(){
    // Visual update
    this.isNowFavourited = !this.isNowFavourited
    if (this.isNowFavourited){
      this.text = "💔"
    } else{
      this.text = "❤"
    }

    // Backend update
    this.updateFavourite();
  }

  updateFavourite(){
    // isNowFavourited means the state to which it just changed
    //    true -> user just favourited pet -> create
    //    false -> user just defavourited pet -> delete
    if (!this.isNowFavourited){
      this.favPetsService.findByUserIdAndPetId(this.user.username, String(this.petId)).subscribe(
        foundEntries=>{
          //console.log("Found "+foundEntries.resources.length+" entries. Should be 1.") //its always 1, but old entry :C
          // Should only exist one, obtain last one in case it didn't update propperly.
          const foundEntry = foundEntries.resources[(foundEntries.resources.length-1)];
          //console.log("foundEntry: {\n\tuserId: "+foundEntry.userId+",\n\tpetId: "+foundEntry.petId+",\n\turi: "+foundEntry.uri+",\n}")
          const entryId = foundEntry.uri.split("/")[2]; //obtain entry id
          // potser es tema de caché, pero està trobant les entrades antigues que s'acaben de borrar :/
          // provant amb deleteResource asecas tampoc funciona, foundEntry segueix sent la vella ://
          this.favPetsService.deleteResourceById(entryId).subscribe(
            res=>{
              console.log("Deleted pet "+this.petId+" from liked pets of user "+this.user.username+". Register nº:"+res.url.split("/")[4]);
              this.retrieveFavourites();
          });
        }
      );      
    } else {
      //perform patch adding just new entry
      const newPair = {userId: this.user.username, petId: this.petId};
      const newEntry = new FavouritedPets(newPair);
      this.favPetsService.createResource({body: newEntry}).subscribe(
        res=>{
          console.log("Created instance "+res.uri.split("/")[2]+" for liked pet "+this.petId+" from user "+this.user.username+".");
          this.retrieveFavourites();
      });
    }
  }
  
  retrieveFavourites(){
    this.http.get<any>(`${this.baseUrl}/favouritedPetses`).subscribe(
      res => {
        const favPets:FavouritedPets[] = res._embedded.favouritedPetses;
        this.user.favouritedPets = []
        // Check if user in FavouritedPets pair is actual user
        favPets.forEach(
          pair=>{
            // When he is, add pair to user's parameter
            if (pair.userId === this.user.username){
              this.user.favouritedPets.push(new FavouritedPets({userId: pair.userId, petId: pair.petId}));
            }
        });
        console.log("Updated favourite pets for user "+this.user.username+".");
      }
    )
  }
}
