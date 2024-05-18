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
      this.shelterService.getResource(this.shelterId).subscribe(
        (shelter) => {
          this.shelterVolunteerService.getResource(this.volunteer.username).subscribe(
            (volunteer) => { 
              volunteer.password = "password";
              volunteer.userShelter = shelter;
              volunteer.passwordReset = false;
              this.shelterVolunteerService.patchResource(volunteer).subscribe(
                (updatedVolunteer: ShelterVolunteer) => {
                  console.log('Volunteer Updated:', updatedVolunteer);
                  this.router.navigate(['shelters', this.shelterId, 'volunteers']);
                },
                (error) => {
                  console.error('Error updating volunteer:', error);
                }
              );
            },
            (error) => {
              console.error('Error retrieving volunteer:', error);
            }
          );
        },
        (error) => {
          console.error('Error retrieving shelter:', error);
        }
      );
    }
  }