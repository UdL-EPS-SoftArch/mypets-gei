import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Component({
    selector: 'app-volunteer-edit',
    templateUrl: './volunteer-edit.component.html'
  })
  export class ShelterVolunteersEditComponent implements OnInit {
  
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