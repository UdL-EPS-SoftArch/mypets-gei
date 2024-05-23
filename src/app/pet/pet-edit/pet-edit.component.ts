import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormsModule } from '@angular/forms'
import { Pet } from '../pet'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { PetService } from '../pet.service'

@Component({
  selector: 'app-pet-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pet-edit.component.html',
  styleUrl: './pet-edit.component.css',
})
export class PetEditComponent implements OnInit {
  public pet: Pet
  petForm: FormGroup

  constructor(
    private petsService: PetService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fetchPet()
  }

  fetchPet(): void {
    const petId = this.activatedRoute.snapshot.params.id
    this.petsService.getResource(petId).subscribe({
      next: (response) => {
        this.pet = response
        console.log(response)
      },
    })
  }

  onSubmit() {
    const petId = this.activatedRoute.snapshot.paramMap.get('id')
    this.petsService.patchResource(this.pet).subscribe((_pet) => {
      this.router.navigate(['pet-details', petId])
    })
  }
}
