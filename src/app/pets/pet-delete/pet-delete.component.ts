
import { Component, inject, OnInit   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from '../pets.service';
import { PetData } from '../pet-data';

@Component({
  selector: 'app-pet-delete',
  standalone: true,
  templateUrl: './pet-delete.component.html',
  styleUrl: './pet-delete.component.css'
})
export class PetDeleteComponent implements OnInit{
  public petData: PetData = new PetData();
  private id: string;

  constructor(private router: Router,
              private petsService: PetsService,
              private route: ActivatedRoute

  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.petsService.getResource(this.id).subscribe(
      petData => this.petData = petData);
  }
  delete(): void {  
   this.petsService.deleteResource(this.petData).subscribe(
    () => {
      this.router.navigate(['']);
    });
  }
}
