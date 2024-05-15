import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Shelter } from '../shelter-data'
import { ShelterService } from '../shelter.service'
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client'

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
    this.shelterService
      .getPage()
      .subscribe((collection: PagedResourceCollection<Shelter>) => {
        if (collection.totalElements == 0) {
          this.shelters = [
            new Shelter({
              id: 1,
              name: 'Example Shelter',
              email: 'shelter@example.com',
              mobile: '1234567890',
              createdAt: new Date(),
              updatedAt: new Date(),
              isActive: true,
              rating: 4.5,
              locatedAt: {},
            }),

            new Shelter({
              id: 2,
              name: 'Example Shelter',
              email: 'shelter@example.com',
              mobile: '1234567890',
              createdAt: new Date(),
              updatedAt: new Date(),
              isActive: true,
              rating: 4.5,
              locatedAt: {},
            }),
          ]
        } else {
          this.shelters = collection.resources
        }
      })
  }

  addFakeShelter(): void {
    const fakeShelter = new Shelter({
      id: 1,
      name: 'Example Shelter',
      email: 'shelter@example.com',
      mobile: '1234567890',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      rating: 4.5,
      locatedAt: {},
    })
    this.shelterService.createResource({ body: fakeShelter }).subscribe({
      next: () => {
        console.log('added')
      },
      error: (error) => {
        console.log(error)
      },
    })
  }
}
