import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { RouterModule } from '@angular/router';
import { PetComponent } from '../pet/pet.component';
import { Pet } from '../pet';
import { PetService } from '../pet.service';
@Component({
  selector: 'app-pets-grid',
  standalone: true,
  templateUrl: './pets-grid.component.html',
  styleUrls: ['./pets-grid.component.css'],
  imports: [CommonModule,PetComponent,RouterModule]
})

export class PetsGridComponent implements OnInit{

  public petsList: Pet[] = [];
  public pageSize = 5;
  public page = 1;
  public filteredPetsList: Pet[] = [];
  constructor(
    public petService: PetService,
    public router: Router,
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
    console.log("Hello");
    this.petService.getPage({ pageParams:  { size: this.pageSize }, sort: { name: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Pet>) => {
        this.petsList = page.resources;
        console.log(this.petsList);
        this.filteredPetsList = this.petsList;

      });
  }
  navigateToAddPet() {
    this.router.navigate(['/pet-grid/add-pet']);
  }
}
