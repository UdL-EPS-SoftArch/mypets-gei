import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { FavouritedPets } from './favourited-pets';

@Injectable({providedIn: 'root'})
export class FavouritedPetsService extends HateoasResourceOperation<FavouritedPets> {

  constructor() {
    super(FavouritedPets);
  }
  public findByUserId(query: string): Observable<ResourceCollection<FavouritedPets>> {
    return this.searchCollection('findByUserId', { params: { text: query } });
  }

  public findByUserIdAndPetId(userId: string, petId: string): Observable<ResourceCollection<FavouritedPets>> {
    return this.searchCollection('findByUserIdAndPetId', { params: { userId: userId, petId: petId }});
  }
}