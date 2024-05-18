import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ShelterVolunteer } from '../shelterVolunteer';
import { ShelterVolunteerService } from '../shelterVolunteer.service';
import { ShelterService } from '../shelter.service';

@Component({
    selector: 'app-volunteer-add',
    templateUrl: './volunteer-add.component.html'
  })
  export class ShelterVolunteersAddComponent{
  
    volunteer: ShelterVolunteer = new ShelterVolunteer();
    
    constructor(
      private route: ActivatedRoute,
      public router: Router,
      public shelterVolunteerService: ShelterVolunteerService, 
      public shelterService: ShelterService) {
    }

    public shelterId = Number(this.route.snapshot.params.id);

    cancelClicked(): void {
      this.router.navigate(['shelters', this.shelterId, 'volunteers']);
    }

    addVolunteer(): void {
        const shelter = this.shelterService.getResource(this.shelterId).subscribe(
          (shelter) => {
            this.shelterVolunteerService.getResource(this.volunteer.username).subscribe
            ((volunteer) => { 
              this.volunteer = volunteer;
              this.volunteer.userShelter = shelter; 
              this.volunteer.password = volunteer.password
              this.volunteer.passwordReset = volunteer.passwordReset
              this.shelterVolunteerService.patchResource(this.volunteer).subscribe(
                (volunteer: ShelterVolunteer) => {
                  console.log('Volunteer Udpated:', volunteer);
                  this.router.navigate(['shelters', this.shelterId, 'volunteers']);
                }
                  );
              }
            );
          }
        );
    } 
  }