import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Shelter } from '../shelter-data'
import { ShelterService } from '../shelter.service'
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client'
import { Router } from '@angular/router'

@Component({
  selector: 'app-shelter-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shelter-list.component.html',
  styleUrl: './shelter-list.component.css',
})
export class ShelterListComponent implements OnInit {
  public shelters: Shelter[]

  constructor(
    private shelterService: ShelterService,
    private router: Router,
  ) { }

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

  navigateToCreate() {
    this.router.navigate(['/shelters', 'create'])
  }
}
