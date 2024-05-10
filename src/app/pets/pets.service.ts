import { Injectable } from '@angular/core';
import { PetData } from './pet-data';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  protected petsList: PetData[] = [{
    id: 1,
    name: 'Fluffy',
    species: 'Cat',
    breed: 'Siamese',
    photo: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    shelter: 'Shady Pines Shelter'
  },
  {
    id: 2,
    name: 'Fido',
    species: 'Dog',
    breed: 'Golden Retriever',
    photo: 'https://images.pexels.com/photos/33537/cat-animal-cat-portrait-mackerel.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    shelter: 'Paws and Claws Shelter'
  },
  {
    id: 3,
    name: 'Squawks',
    species: 'Bird',
    breed: 'Parrot',
    photo: 'https://images.pexels.com/photos/2930204/pexels-photo-2930204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    shelter: 'Wings of Love Shelter'
  }];
  getAllPets(): PetData[] {
    return this.petsList;
  }
}
