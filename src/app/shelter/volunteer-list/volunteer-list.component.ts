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
    public totalUsers = 0;
  
    constructor(
      public router: Router) {
    }
  
    ngOnInit(): void {
     
    }
  
    changePage(): void {
      
    }
  
    detail(user: User): void {
      this.router.navigate(['users', user.username]);
    }
  }