import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ShelterVolunteerService } from '../shelterVolunteer.service';
import { ActivatedRoute } from '@angular/router';
import { ShelterVolunteer } from '../shelterVolunteer';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchComponent } from 'src/app/user/user-search/user-search.component';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  standalone: true,
  imports: [NgbPaginationModule, UserSearchComponent, NgFor]
})
export class ShelterVolunteersListComponent implements OnInit {
  public users: ShelterVolunteer[] = [];
  public pageSize = 5;
  public page = 1;
  public totalVolunteers = 0;
  @Input() shelterId: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private shelterVolunteerService: ShelterVolunteerService) {
  }

  ngOnInit(): void {
    this.shelterVolunteerService.getVolunteersByShelterId(this.shelterId).subscribe(
      (volunteers: ShelterVolunteer[]) => {
        console.log('Received volunteers:', volunteers);
        this.users = volunteers;
        this.totalVolunteers = volunteers.length;
      },
      error => {
        console.error('Error retrieving volunteers:', error);
      }
    );
  }

  changePage(): void {
    this.shelterVolunteerService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<ShelterVolunteer>) => {
        console.log('Page change:', page);
        this.users = page.resources;
      },
      error => {
        console.error('Error changing page:', error);
      }
    );
  }

  detail(user: any): void {
    const currentUrl = this.router.url;
    this.router.navigate(['shelters', this.shelterId, 'volunteers', user.username]);
  }

  addVolunteer(): void {
    const currentUrl = this.router.url;
    this.router.navigate(['shelters', this.shelterId, 'volunteers', 'add']);
  }
}
