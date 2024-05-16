import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Volunteer } from '../../volunteer/volunteer';
import { VolunteerService } from 'src/app/volunteer/volunteer.service';
import { Shelter } from '../shelter';
import { ShelterService } from '../shelter.service';
@Component({
  selector: 'app-volunteer-kick',
  templateUrl: './volunteer-kick.component.html',
})
export class VolunteerKickComponent implements OnInit{
  public shelter: Shelter = new Shelter();
  public volunteer: Volunteer = new Volunteer();
  private shleter_id: string;
  private volunteer_id: string;
  
  constructor(
    private route: ActivatedRoute,
    private volunteerService: VolunteerService,
    private shleterService: ShelterService,
    private router: Router,
) {
}

  kick(): void{
    this.volunteerService.deleteResource(this.volunteer).subscribe(
      () => {
        this.router.navigate(['/shelters'+this.shelter.name]);
      });
  }

  
  ngOnInit(): void {
    this.volunteer_id = this.route.snapshot.paramMap.get('volunteer');
    this.volunteerService.getResource(this.volunteer_id).subscribe(
      volunteer => {
        this.volunteer = volunteer
        this.volunteer.getRelation<Shelter>("userShelter").subscribe(
          shelter => this.shelter = shelter
        )
      });
      
  }
  


}
