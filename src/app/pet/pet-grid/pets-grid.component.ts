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
  public filteredNameList: Pet[] = [];
  public filteredAgeList: Pet[] = [];
  public filteredColorList: Pet[] = [];
  constructor(
    public petService: PetService,
    public router: Router,
  ) {}

   filterResultsByName(name: string) {
    if (name === "") {
      this.filteredNameList = this.petsList;
    } else{
      this.filteredNameList = this.petsList.filter(pet => {
        return pet.name.toLowerCase().includes(name.toLowerCase());
      });
    }
    this.filteredPetsList = this.filteredNameList.filter(pet => this.filteredColorList.includes(pet)).filter(pet => this.filteredAgeList.includes(pet))
  }
  filterResultsByColor(color: string) {
    
    if (color === "") {
      this.filteredColorList = this.petsList;
    }else{
      this.filteredColorList = this.petsList.filter(pet => {
        return pet.color.toLowerCase().includes(color.toLowerCase());
      });
    }
    this.filteredPetsList = this.filteredNameList.filter(pet => this.filteredColorList.includes(pet)).filter(pet => this.filteredAgeList.includes(pet))

  }  



  ngOnInit(): void {
    console.log("Hello");
    this.petService.getPage({ pageParams:  { size: this.pageSize }, sort: { name: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Pet>) => {
        this.petsList = page.resources;
        this.filteredAgeList = this.petsList
        this.filteredColorList = this.petsList
        this.filteredNameList = this.petsList

        console.log(this.petsList);
        this.filteredPetsList = this.petsList;

      });
  }
  navigateToAddPet() {
    this.router.navigate(['/pet-grid/add-pet']);
  }
}
