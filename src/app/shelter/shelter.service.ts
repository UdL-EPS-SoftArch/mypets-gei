import { Injectable } from '@angular/core'
import {
  HateoasResourceOperation,
  ResourceCollection,
} from '@lagoshny/ngx-hateoas-client'
import { Observable } from 'rxjs'
import { Shelter } from './shelter'

@Injectable({
  providedIn: 'root',
})
export class ShelterService extends HateoasResourceOperation<Shelter> {
  constructor() {
    super(Shelter)
  }

  public findByName(query: string): Observable<ResourceCollection<Shelter>> {
    return this.searchCollection('findByName', { params: { name: query } })
  }

  public findByEmail(query: string): Observable<ResourceCollection<Shelter>> {
    return this.searchCollection('findByEmail', { params: { email: query } })
  }
  public findByMobile(query: string): Observable<ResourceCollection<Shelter>> {
    return this.searchCollection('findByMobile', { params: { mobile: query } })
  }
}
