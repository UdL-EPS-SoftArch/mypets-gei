import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { PetComponent } from '../pet/pet.component';
import { PetData } from '../pet-data';
import { PetsService } from '../pets.service';
import { Router } from '@angular/router';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Component({
  selector: 'app-pets-grid',
  standalone: true,
  templateUrl: './pets-grid.component.html',
  styleUrls: ['./pets-grid.component.css'],
  imports: [CommonModule,PetComponent]
})

export class PetsGridComponent implements OnInit{
  
  public petsList: PetData[] = [];
  public pageSize = 5;
  public page = 1;
  public totalUsers = 0;
  public filteredPetsList: PetData[] = [];
  constructor(
    public petsService: PetsService,
    public router: Router
  ) {}

   filterResultsByName(name: string) {
    if (name === "") {
      this.filteredPetsList = this.petsList;
    } else {
      this.filteredPetsList = this.petsList.filter(pet => {
        return pet.name.toLowerCase().includes(name.toLowerCase());
      });
    }
  }  
 
  ngOnInit(): void {
    console.log("Hello, world!");    
    this.petsService.getPage({ pageParams:  { size: this.pageSize }, sort: { name: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<PetData>) => {
        this.petsList = page.resources;
        console.log(this.petsList);
        this.totalUsers = page.totalElements;
      });
  }
  
}
