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
    shelter: 'Shady Pines Shelter',
    isAdopted: false,
    color: 'White',
    size: 'Medium',
    weight: 5,
    age: '2 years',
    description: 'Fluffy is a playful and affectionate Siamese cat.'
  },
  {
    id: 2,
    name: 'Fido',
    species: 'Dog',
    breed: 'Golden Retriever',
    photo: 'https://images.pexels.com/photos/33537/cat-animal-cat-portrait-mackerel.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    shelter: 'Paws and Claws Shelter',
    isAdopted: false,
    color: 'Golden',
    size: 'Large',
    weight: 30,
    age: '3 years',
    description: 'Fido is a friendly and loyal Golden Retriever.'
  },
  {
    id: 3,
    name: 'Squawks',
    species: 'Bird',
    breed: 'Parrot',
    photo: 'https://images.pexels.com/photos/2930204/pexels-photo-2930204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    shelter: 'Wings of Love Shelter',
    isAdopted: false,
    color: 'Multicolored',
    size: 'Small',
    weight: 0.5,
    age: '1 year',
    description: 'Squawks is a colorful and talkative parrot.'
  }];

  async getAllPets(): Promise<PetData[]> {
    return this.petsList;
  }

  getPet(id: number): PetData | undefined {
    return this.petsList.find(pet => pet.id === id);
  }

  addPet(pet: PetData): void {
    this.petsList.push(pet);
  }

  updatePet(id: number, updatedPet: PetData): boolean {
    const index = this.petsList.findIndex(pet => pet.id === id);
    if (index !== -1) {
      this.petsList[index] = { ...this.petsList[index], ...updatedPet };
      return true;
    }
    return false;
  }

  deletePet(id: number): boolean {
    const index = this.petsList.findIndex(pet => pet.id === id);
    if (index !== -1) {
      this.petsList.splice(index, 1);
      return true;
    }
    return false;
  }
}
