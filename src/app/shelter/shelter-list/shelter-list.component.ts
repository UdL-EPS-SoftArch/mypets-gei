import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Shelter } from '../shelter-data'
import { ShelterService } from '../shelter.service'
import { Include, PagedResourceCollection } from '@lagoshny/ngx-hateoas-client'

@Component({
  selector: 'app-shelter-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shelter-list.component.html',
  styleUrl: './shelter-list.component.css',
})
export class ShelterListComponent implements OnInit {
  public shelters: Shelter[]

  constructor(private shelterService: ShelterService) {}

  ngOnInit(): void {
    this.fetchShelters()
  }

  fetchShelters(): void {
    this.shelterService
      .getPage()
      .subscribe((collection: PagedResourceCollection<Shelter>) => {
        this.shelters = collection.resources
      })
  }

  addFakeShelter(): void {
    // email and mobile must be unique
    const fakeShelter = new Shelter({
      name: 'Example Shelter',
      email: 'shelter@example.com' + this.shelters.length,
      mobile: '1234567890' + this.shelters.length,
      createdAt: new Date(),
      updatedAt: null,
      isActive: true,
      rating: 4.5,
      locatedAt: {},
    })
    this.shelterService
      .createResource({
        body: fakeShelter,
        valuesOption: { include: Include.NULL_VALUES },
      })
      .subscribe({
        next: () => {
          this.fetchShelters()
        },
      })
  }
}
