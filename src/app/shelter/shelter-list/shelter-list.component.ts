import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Shelter } from '../shelter-data'
import { ShelterService } from '../shelter.service'
import { Include, PagedResourceCollection } from '@lagoshny/ngx-hateoas-client'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-shelter-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  navigateToDeleteShelter(): void {
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
  extractNumberFromUri(uri: string): String | null {
    const regex = /\/shelters\/(\d+)/; // Regular expression to match digits after '/pets/'
    const match = uri.match(regex); // Matching the URI with the regular expression
  
      if (match && match.length > 1) {
        return match[1] // Extracting the number part and converting it to a number
      } else {
        // Handling case where the URI format doesn't match expected pattern
        console.error("URI format doesn't match expected pattern.");
        return null
      }
    } 
}
