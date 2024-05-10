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
    photo: 'https://www.pexels.com/photo/adorable-animal-blur-cat-617278/',
    shelter: 'Shady Pines Shelter'
  },
  {
    id: 2,
    name: 'Fido',
    species: 'Dog',
    breed: 'Golden Retriever',
    photo: 'https://www.pexels.com/photo/animal-dog-puppy-german-shepherd-33537/',
    shelter: 'Paws and Claws Shelter'
  },
  {
    id: 3,
    name: 'Squawks',
    species: 'Bird',
    breed: 'Parrot',
    photo: 'https://www.pexels.com/photo/animal-avian-beak-beautiful-356378/',
    shelter: 'Wings of Love Shelter'
  }];
  getAllPets(): PetData[] {
    return this.petsList;
  }
}
