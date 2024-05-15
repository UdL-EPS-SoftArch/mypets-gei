
import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';
import { Shelter } from '../shelter/shelter';

@HateoasResource('volunteer')
export class Volunteer extends User {
    userShelter = new Shelter()

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }


}
