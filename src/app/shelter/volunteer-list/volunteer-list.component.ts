import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

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
    public router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getPage({ pageParams:  { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
        (page: PagedResourceCollection<User>) => {
          this.users = page.resources;
          this.totalVolunteers = page.totalElements;
        });
  }

  changePage(): void {
    this.userService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<User>) => this.users = page.resources);
  }

  detail(user: User): void {
    this.router.navigate(['volunteer', user.username]);
  }
}