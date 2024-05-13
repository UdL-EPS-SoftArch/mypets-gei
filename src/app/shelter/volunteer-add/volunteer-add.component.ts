import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Component({
    selector: 'app-volunteer-add',
    templateUrl: './volunteer-add.component.html'
  })
  export class ShelterVolunteersAddComponent implements OnInit {
  
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