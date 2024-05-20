import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('shelters')
export class Shelter extends Resource {
  name : string;
  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}