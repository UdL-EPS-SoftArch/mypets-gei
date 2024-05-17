import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Pet } from './pet';

@Injectable({
  providedIn: 'root'
})
export class PetService extends HateoasResourceOperation<Pet> {

  constructor() {
    super(Pet);
  }

  public findByIdContaining(query: string): Observable<ResourceCollection<Pet>> {
    return this.searchCollection('findByIdContaining', { params: { text: query } });
  }
  public findBySize(size: string): Observable<ResourceCollection<Pet>> {
    return this.searchCollection('findBySize', { params: { size } });
  }
  public findByName (name: string): Observable<ResourceCollection<Pet>> {
    return this.searchCollection('findByName', { params: { name } });
  }
  public findByBreed (breed: string): Observable<ResourceCollection<Pet>> {
    return this.searchCollection('findByBreed', { params: { breed } });
  }
  public findByIsAdopted (isAdopted: boolean): Observable<ResourceCollection<Pet>> {
    return this.searchCollection('findByIsAdopted', { params: { isAdopted } });
  }
  public getAllPets(): Observable<ResourceCollection<Pet>> {
    return this.getCollection();
  }

}
