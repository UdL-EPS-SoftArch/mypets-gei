
import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { Shelter } from '../shelter/shelter';

@HateoasResource('shelterVolunteers')
export class Volunteer extends Resource {
  //userShelter = new Shelter();
  username = "";
  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }


}
