import { FavouritedPets } from '../pets/favourited-pets';
import { Pet } from '../pets/pet';
import { Authority } from './authority';
import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('users')
export class User extends Resource {
  username: string;
  email: string;
  authorities: Authority[] = [];
  authorization = '';
  password = '';
  passwordReset = false;
  uri: string;
  favouritedPets: FavouritedPets[] = [];

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  getRoles(): string[] {
    return this.authorities.map(a => a.authority.split('_')[1].toLowerCase());
  }
}
