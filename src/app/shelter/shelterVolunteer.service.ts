import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ShelterVolunteer } from './shelterVolunteer';

@Injectable({providedIn: 'root'})
export class ShelterVolunteerService extends HateoasResourceOperation<ShelterVolunteer> {

  constructor() {
    super(ShelterVolunteer);
  }

  public getVolunteersByShelterId(shelterId: number): Observable<ShelterVolunteer[]> {
    return this.getPage().pipe( // Assume a large page size to get all items
      tap((pagedCollection: PagedResourceCollection<ShelterVolunteer>) => {
        console.log('Received PagedResourceCollection:', pagedCollection);
      }),
      map((pagedCollection: PagedResourceCollection<ShelterVolunteer>) => 
        pagedCollection.resources.filter(volunteer => {
          //implement logic to filter
          return true;
        })
      ),
      tap((filteredVolunteers: ShelterVolunteer[]) => {
        console.log('Filtered volunteers:', filteredVolunteers);
      })
    );
  }

  public getAllVolunteers(): Observable<ResourceCollection<ShelterVolunteer>> {
    return this.getCollection();
  }
}
