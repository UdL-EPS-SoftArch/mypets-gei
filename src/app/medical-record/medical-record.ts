import {HateoasResource, Resource, ResourceCollection} from '@lagoshny/ngx-hateoas-client';
import {Pet} from "../pet/pet";

@HateoasResource('medicalRecord')
export class MedicalRecord extends Resource {
  uri: string;
  issue: string;
  description: string;
  date: string;
  pet: Pet;
  id: string;

  constructor(values: object = {}) {
    super();
    this.initialize(values);
  }

  initialize(values: object): void {
    Object.assign(this, values);
    if (typeof this.uri === 'string') {
      this.id = this.extractId(this.uri);
    }
  }

  public set_id_from_uri(): void {
    if (typeof this.uri === 'string') {
      this.id = this.extractId(this.uri);
    }
  }

  private extractId(uri: string): string {
    const lastIndex = uri.lastIndexOf('/');
    return lastIndex > -1 ? uri.substring(lastIndex + 1) : '';
  }
}
