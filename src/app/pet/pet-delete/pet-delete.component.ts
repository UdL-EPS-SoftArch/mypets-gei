
import { Component, inject, OnInit   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../pet.service';
import { Pet } from '../pet';

@Component({
  selector: 'app-pet-delete',
  standalone: true,
  templateUrl: './pet-delete.component.html',
  styleUrl: './pet-delete.component.css'
})
export class PetDeleteComponent implements OnInit{
  public pet: Pet = new Pet();
  private id: string;

  constructor(private router: Router,
              private petService: PetService,
              private route: ActivatedRoute

  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.petService.getResource(this.id).subscribe(
      petData => this.pet = petData);
  }
  delete(): void {
   this.petService.deleteResource(this.pet).subscribe(
    () => {
      this.router.navigateByUrl("/pets-grid");
    });
  }
}
