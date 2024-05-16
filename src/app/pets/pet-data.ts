import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('pets')
export class PetData extends Resource {
    id: number;
    name: string;
    isAdopted: boolean;
    color: string;
    size: string;
    weight: number;
    favouritedByUser: Boolean;
    age: string;
    description: string;
    breed: string;
    isIn: string;
    img: string;
    uri: string;
   
    constructor(values: object = {}) {
        super();
        Object.assign(this as any, values);
    }
    
   
}
