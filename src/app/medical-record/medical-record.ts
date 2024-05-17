import {HateoasResource, Resource, ResourceCollection} from '@lagoshny/ngx-hateoas-client';
import {Pet} from "../pet/pet";

@HateoasResource('medicalRecords')
export class MedicalRecord extends Resource {
  uri: string;
  issue: string;
  description: string;
  date: string;
  pet: Pet;
  id: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this, values);
  }
}
