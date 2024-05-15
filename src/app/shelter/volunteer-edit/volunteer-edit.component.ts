import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ActivatedRoute } from '@angular/router';
import { ShelterVolunteerService } from '../shelterVolunteer.service';
import { ShelterVolunteer } from '../shelterVolunteer';

@Component({
    selector: 'app-volunteer-edit',
    templateUrl: './volunteer-edit.component.html'
  })
  export class ShelterVolunteersEditComponent implements OnInit {
  
    constructor(
      public route: ActivatedRoute,
      public router: Router,
      public shelterVolunteerService: ShelterVolunteerService) {
    }

    public shelterVolunteer: ShelterVolunteer = new ShelterVolunteer();
    
    ngOnInit(): void {
      const volunteerId = this.route.snapshot.params.vId;
      this.shelterVolunteerService.getResource(volunteerId).subscribe(
        (user: ShelterVolunteer) => this.shelterVolunteer = user );
    }
  
    changePage(): void {
      
    }
  }