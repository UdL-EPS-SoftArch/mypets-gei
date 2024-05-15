export interface PetData {
    id:number;
    name:string;
    species:string;
    breed:string;
    photo:string;
    shelter:string;  // maybe this should be the shelter's id or name if names are unique
    isAdopted: Boolean;
    color: String;
    size: String;
    weight: number;
    age: String;
    description: String;
   
}