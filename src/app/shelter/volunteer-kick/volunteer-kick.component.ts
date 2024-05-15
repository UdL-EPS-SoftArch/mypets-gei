import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Volunteer } from '../../volunteer/volunteer';
import { VolunteerService } from 'src/app/volunteer/volunteer.service';
@Component({
  selector: 'app-volunteer-kick',
  templateUrl: './volunteer-kick.component.html',
})
export class VolunteerKickComponent {
  public volunteer: Volunteer = new Volunteer();
  public volunteer_to_kick: Volunteer = new Volunteer();
  private id: string;
  private id_to_kick: string;
  
  constructor(private route: ActivatedRoute,
    private volunteerService: VolunteerService,) {
}

  kick(): void{
    
    this.volunteerService.deleteResource(this.volunteer_to_kick).subscribe(
      () => {
        
      });
  }

  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.volunteerService.getResource(this.id).subscribe(
      volunteer => this.volunteer = volunteer);
    this.id_to_kick = this.route.snapshot.paramMap.get('id_to_kick');
    this.volunteerService.getResource(this.id_to_kick).subscribe(
      volunteer_to_kick => this.volunteer_to_kick = volunteer_to_kick);
  }
  


}
