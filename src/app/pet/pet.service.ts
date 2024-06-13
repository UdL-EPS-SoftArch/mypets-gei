import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Pet } from './pet';

@Injectable({
  providedIn: 'root'
})
export class PetService extends HateoasResourceOperation<Pet> {
  constructor(private http: HttpClient) {
    super(Pet);
  }

  public findByIdContaining(query: string): Observable<ResourceCollection<Pet>> {
    return this.searchCollection('findByIdContaining', { params: { text: query } });
  }

  public getAllPets(): Observable<ResourceCollection<Pet>> {
    return this.getCollection();
  }

  getPetByUrl(petUrl: string): Observable<Pet> {
    return this.http.get<Pet>(petUrl);
  }
}
