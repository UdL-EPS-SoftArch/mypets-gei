import { Component } from '@angular/core';
import { Shelter } from '../shelter';
import { ShelterService } from '../shelter.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shelter-delete',
  standalone: true,
  imports: [],
  templateUrl: './shelter-delete.component.html',
  styleUrl: './shelter-delete.component.css'
})
export class ShelterDeleteComponent {
  public shelter: Shelter = new Shelter()

  constructor(private shelterService: ShelterService,
              private route: ActivatedRoute,
              private router: Router
  ) {}
  fetchShelter(): void {
    console.log("Id is ",this.route.snapshot.params.id)
    this.shelterService.getResource(this.route.snapshot.params.id).subscribe({
      next: (shelter: Shelter) => {
        this.shelter = shelter
      },
    })
  }
  ngOnInit(): void {
    this.fetchShelter()
  }
  cancelClicked() {
    this.router.navigateByUrl("/shelters");
  }
  deleteShelter(): void {
    this.shelterService.deleteResource(this.shelter).subscribe({
      next: () => {
        this.shelter = new Shelter()
        this.cancelClicked()
      },
    })
  }
}
