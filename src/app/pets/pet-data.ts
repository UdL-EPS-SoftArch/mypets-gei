import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('pets')
export class PetData extends Resource {

    name: String
    isAdopted: Boolean
    color: String
    size: String
    weight: number
    age: String
    description: String //Shelter name here
    breed: String
    img: String
   
    constructor(values: object = {}) {
        super();
        Object.assign(this as any, values);
    }
}
