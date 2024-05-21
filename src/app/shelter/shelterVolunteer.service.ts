import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, tap, mergeMap, toArray, filter } from 'rxjs/operators';
import { HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ShelterVolunteer } from './shelterVolunteer';
import { Shelter } from './shelter';

@Injectable({ providedIn: 'root' })
export class ShelterVolunteerService extends HateoasResourceOperation<ShelterVolunteer> {

  constructor() {
    super(ShelterVolunteer);
  }

  public getVolunteersByShelterId(shelterId: number): Observable<ShelterVolunteer[]> {
    return this.getPage().pipe(
      tap((pagedCollection: PagedResourceCollection<ShelterVolunteer>) => {
        console.log('Received PagedResourceCollection:', pagedCollection);
      }),
      mergeMap((pagedCollection: PagedResourceCollection<ShelterVolunteer>) =>
        from(pagedCollection.resources).pipe(
          mergeMap((volunteer: ShelterVolunteer) =>
            this.getShelterOfVolunteer(volunteer).pipe(
              map((shelterHref: string) => ({ volunteer, shelterHref }))
            )
          ),
          filter(({ shelterHref }) => shelterHref.includes(`/shelters/${shelterId}`)),
          map(({ volunteer }) => volunteer),
          toArray()
        )
      ),
      tap((filteredVolunteers: ShelterVolunteer[]) => {
        console.log('Filtered volunteers:', filteredVolunteers);
      })
    );
  }

  public getShelterOfVolunteer(volunteer: ShelterVolunteer): Observable<string> {
    return volunteer.getRelation('userShelter').pipe(
      map((shelter: Shelter) => {
        console.log('Shelter:', shelter);
        return shelter.getSelfLinkHref();
      })
    );
  }

  public getAllVolunteers(): Observable<ResourceCollection<ShelterVolunteer>> {
    return this.getCollection();
  }
}
