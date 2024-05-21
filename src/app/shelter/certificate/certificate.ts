import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('shelterCertificates')
export class Certificate extends Resource {
  id: number;
  expirationDate: string;
  validated: boolean;
  shelterServed: number;
  uri: number;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
