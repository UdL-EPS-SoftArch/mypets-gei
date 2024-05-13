import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Component({
    selector: 'app-volunteer-delete',
    templateUrl: './volunteer-delete.component.html'
  })
  export class ShelterVolunteersDeleteComponent implements OnInit {
  
    constructor(
      public router: Router) {
    }
  
    ngOnInit(): void {
     
    }
  
    changePage(): void {
      
    }
  
    detail(user: User): void {
      
    }
  }