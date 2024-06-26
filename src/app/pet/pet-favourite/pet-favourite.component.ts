import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../login-basic/user';
import { Pet } from '../pet';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';
import { HttpClient } from '@angular/common/http';
import { FavouritedPets } from '../favourited-pets';
import { FavouritedPetsService } from '../favourited-pets.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pet-favourite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-favourite.component.html',
  styleUrl: './pet-favourite.component.scss'
})
export class PetFavouriteComponent implements OnInit {
  text: string = "Like button"
  route: ActivatedRoute = inject(ActivatedRoute);
  favPetsService: FavouritedPetsService = inject(FavouritedPetsService);
  isNowFavourited: Boolean = false;
  user: User = new User();
  pet:Pet = new Pet();
  baseUrl: String = environment.API;
  petId:number;

  constructor(
    private authService: AuthenticationBasicService,
    private http:HttpClient,
    private router: Router,){}

  ngOnInit(): void {
    // Get id of pet on display
    this.petId = Number(this.route.snapshot.paramMap.get('id'));

    // Get current user data
    this.user = this.authService.getCurrentUser();

    // Fill user.favouritedPets from info on the backend. Instead of using retrieveFavourites,
    // we'll do it directly since we need the result of the update to take effect.
    this.http.get<any>(`${this.baseUrl}/favouritedPetses`).subscribe(
      res => {
        const favPets:FavouritedPets[] = res._embedded.favouritedPetses;
        // Check if user in FavouritedPets pair is actual user
        favPets.forEach(
          pair=>{
            // When he is, add pair to user's parameter
            if (pair.userId === this.user.username){
              this.user.favouritedPets.push(new FavouritedPets({userId: pair.userId, petId: pair.petId}));
            }
        });

        // With updated values, visually show if pet is liked or disliked by user
        for (var i=0; i < this.user.favouritedPets.length; i++){
          if(this.petId === this.user.favouritedPets[i].petId){
            this.isNowFavourited = true;
            break;
          }
        }
        if (this.isNowFavourited){
          this.text = "💔";
        } else{
          this.text = "❤";
        }
      }
    )
  }

  onClick(): void{
    // Visual update
    this.isNowFavourited = !this.isNowFavourited;
    if (this.isNowFavourited){
      this.text = "💔";
    } else{
      this.text = "❤";
    }

    // Backend update
    this.updateFavourite();
  }

  updateFavourite(): void{
    // isNowFavourited means the state to which it just changed
    if (!this.isNowFavourited){ //was favourited, not anymore
      // Find entry to delete
      this.favPetsService.findByUserIdAndPetId(this.user.username, String(this.petId)).subscribe({
        next: (foundEntries)=>{
          // Obtain entry in itself.
          const foundEntry = foundEntries.resources[0];
          console.log("foundEntry: {\n\tuserId: "+foundEntry.userId+",\n\tpetId: "+foundEntry.petId+",\n\tpetInstance: "+foundEntry.uri.split("/")[2]+",\n}");
          // Request deletion to backend
          this.favPetsService.deleteResource(foundEntry).subscribe(
            res=>{
              console.log("Deleted pet "+this.petId+" from liked pets of user "+this.user.username+". Instance nº:"+res.url.split("/")[4]);
              // Update local repo
              this.retrieveFavourites();
          });
        }
      });
    } else { //was not favourited, now it is
      // Create new FavouritePets object
      const newPair = {userId: this.user.username, petId: this.petId};
      const newEntry = new FavouritedPets(newPair);
      // Request creation to backend
      this.favPetsService.createResource({body: newEntry}).subscribe(
        res=>{
          console.log("Created instance "+res.uri.split("/")[2]+" for liked pet "+this.petId+" from user "+this.user.username+".");
          // Update local repo
          this.retrieveFavourites();
      });
    }
  }

  retrieveFavourites(): void{
    // Obtain all entries from all users
    this.http.get<any>(`${this.baseUrl}/favouritedPetses`).subscribe(
      res => {
        // Filter to get just the ones THIS user liked
        const favPets:FavouritedPets[] = res._embedded.favouritedPetses;
        // Clear previous data
        this.user.favouritedPets.length = 0;
        // Check if user in FavouritedPets pair is actual user
        favPets.forEach(
          pair=>{
            // When he is, add pair to user's parameter
            if (pair.userId === this.user.username){
              this.user.favouritedPets.push(new FavouritedPets({userId: pair.userId, petId: pair.petId}));
            }
        });
        console.log("Updated favourite pets for user "+this.user.username+".");
        console.log(this.user.username+" now has "+this.user.favouritedPets.length+" pets marked as favourite!");
        // For testing purposes, sleep and then reload to see console logs: 
        //this.sleep(5000).then(()=>{window.location.reload();})
        // Update page so findById recharges
        window.location.reload();
      }
    );
  }

  // Aditional method for testing purposes
  //sleep(ms:number) {
  //  return new Promise(resolve => setTimeout(resolve, ms));
  //}
}
