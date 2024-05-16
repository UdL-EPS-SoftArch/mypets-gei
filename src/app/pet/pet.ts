import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('pets')
export class Pet extends Resource {
    id: number;
    name: string;
    isAdopted: boolean;
    color: string;
    size: string;
    weight: number;
    age: string;
    description: string;
    breed: string;
    isIn: string;

    constructor(values: object = {}) {
        super();
        Object.assign(this as any, values);
    }
}
