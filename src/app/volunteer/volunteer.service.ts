import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Volunteer } from './volunteer';

@Injectable({providedIn: 'root'})
export class VolunteerService extends HateoasResourceOperation<Volunteer> {

  constructor() {
    super(Volunteer);
  }
  public findByIdContaining(query: string): Observable<ResourceCollection<Volunteer>> {
    return this.searchCollection('findByIdContaining', { params: { text: query } });
  }
}