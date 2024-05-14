import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

import { User } from '../login-basic/user';

@HateoasResource('shelterVolunteers')
export class ShelterVolunteer extends User {
  userShelter: Shelter; //need shelter class

  constructor(values: object = {}) {
    super(values);
    Object.assign(this as any, values);
  }

  getAuthorities(): string[] {
    return ['ROLE_SHELTER_VOLUNTEER'];
  }
}
