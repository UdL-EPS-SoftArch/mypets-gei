import { Injectable } from '@angular/core'
import {
  HateoasResourceOperation,
  ResourceCollection,
} from '@lagoshny/ngx-hateoas-client'
import { Observable } from 'rxjs'
import { Shelter } from './shelter-data'

@Injectable({
  providedIn: 'root',
})
export class ShelterService extends HateoasResourceOperation<Shelter> {
  constructor() {
    super(Shelter)
  }

  public findByName(query: string): Observable<ResourceCollection<Shelter>> {
    return this.searchCollection('findByName', { params: { text: query } })
  }
}
