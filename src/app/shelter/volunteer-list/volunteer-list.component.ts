import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ShelterVolunteerService } from '../shelterVolunteer.service';
import { ActivatedRoute } from '@angular/router';
import { ShelterVolunteer } from '../shelterVolunteer';
@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html'
})
export class ShelterVolunteersListComponent implements OnInit {
  public users: User[] = [];
  public pageSize = 5;
  public page = 1;
  public totalVolunteers = 0;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private shelterVolunteerService: ShelterVolunteerService) {
  }

  ngOnInit(): void {
    const shelterId = this.route.snapshot.params.id;

    this.shelterVolunteerService.getPage({
        pageParams: { size: this.pageSize },
        sort: { username: 'ASC' },
    }).subscribe(
        (page: PagedResourceCollection<ShelterVolunteer>) => {
            this.users = page.resources;
            this.totalVolunteers = page.totalElements;
        });
  }

  changePage(): void {
    this.shelterVolunteerService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<ShelterVolunteer>) => this.users = page.resources);
  }

  detail(user: any): void {
    const currentUrl = this.router.url;
    this.router.navigate([`${currentUrl}`, user.username]);
  }
}