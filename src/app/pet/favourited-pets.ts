import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('favouritedPetses')
export class FavouritedPets extends Resource {
  id:number;
  uri:string;
  userId = '';
  petId = 0;

  constructor(values: object = {}) {
    super()
    Object.assign(this, values);
  }
}