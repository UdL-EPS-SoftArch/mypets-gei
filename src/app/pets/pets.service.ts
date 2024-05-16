import { Injectable } from '@angular/core';
import { PetData } from './pet-data';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
  providedIn: 'root'
})
export class PetsService extends HateoasResourceOperation<PetData> {

  constructor() {
    super(PetData);
  }

  public findByIdContaining(query: string): Observable<ResourceCollection<PetData>> {
    return this.searchCollection('findByIdContaining', { params: { text: query } });
  }
  public getAllPets(): Observable<ResourceCollection<PetData>> {
    return this.getCollection();  
  }

}