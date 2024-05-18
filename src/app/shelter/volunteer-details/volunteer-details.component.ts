import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ActivatedRoute } from '@angular/router';
import { ShelterVolunteerService } from '../shelterVolunteer.service';
import { ShelterVolunteer } from '../shelterVolunteer';

@Component({
    selector: 'app-volunteer-details',
    templateUrl: './volunteer-details.component.html'
  })
  export class ShelterVolunteersDetailsComponent implements OnInit {
  
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