import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ShelterVolunteer } from './shelterVolunteer';

@Injectable({providedIn: 'root'})
export class ShelterVolunteerService extends HateoasResourceOperation<ShelterVolunteer> {

  constructor() {
    super(ShelterVolunteer);
  }

  public getVolunteerByShelterId(query: string): Observable<ResourceCollection<ShelterVolunteer>> {
    return this.searchCollection('findByIdContaining', { params: { text: query } });
  }
}
