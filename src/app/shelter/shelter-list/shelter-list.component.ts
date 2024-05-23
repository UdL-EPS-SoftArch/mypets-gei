import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Shelter } from '../shelter'
import { ShelterService } from '../shelter.service'
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client'
import { Router, RouterModule } from '@angular/router'
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";

@Component({
  selector: 'app-shelter-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shelter-list.component.html',
  styleUrl: './shelter-list.component.css',
})
export class ShelterListComponent implements OnInit {
  public shelters: Shelter[]

  constructor(
    private authenticationService: AuthenticationBasicService,
    private shelterService: ShelterService,
    private router: Router,
  ) {}

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

  navigateToEdit(uri: string) {
    this.router.navigate([uri + '/edit'])
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }
}
