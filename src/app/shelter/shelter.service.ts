import { Injectable } from '@angular/core';
import { ShelterData } from './shelter-data';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  protected shelters: ShelterData[] = [
    {
      id: 1,
      name: 'Lleida Shelter',
      email: 'shelter1@example.com',
      mobile: '1234567890',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      rating: 4.5
    },
    {
      id: 2,
      name: 'Barcelona Shelter ',
      email: 'shelter2@example.com',
      mobile: '9876543210',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      rating: 3.8
    },
    {
      id: 3,
      name: 'Tarragona Shelter',
      email: 'shelter3@example.com',
      mobile: '5555555555',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      rating: 4.2
    }
  ]

  async getAllShelters(): Promise<ShelterData[]> {
    return this.shelters;
  }
}
