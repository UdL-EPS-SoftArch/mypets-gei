import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('medical-records')
export class MedicalRecord extends Resource {
  id: number;
  issue: string;
  description: string;
  date: string;
  pet: number;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
