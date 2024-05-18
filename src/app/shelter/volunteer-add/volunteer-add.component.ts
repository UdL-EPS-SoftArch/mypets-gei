import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ShelterVolunteer } from '../shelterVolunteer';
import { ShelterVolunteerService } from '../shelterVolunteer.service';

@Component({
    selector: 'app-volunteer-add',
    templateUrl: './volunteer-add.component.html'
  })
  export class ShelterVolunteersAddComponent{
  
    volunteer: ShelterVolunteer = new ShelterVolunteer();
    
    constructor(
      private route: ActivatedRoute,
      public router: Router,
      public shelterVolunteerService: ShelterVolunteerService) {
    }

    public shelterId = Number(this.route.snapshot.params.id);

    cancelClicked(): void {
      this.router.navigate(['shelters', this.shelterId, 'volunteers']);
    }

    addVolunteer(): void {
      
    }
  }