import { Component, OnInit } from '@angular/core'
import { Shelter } from '../shelter'
import { ShelterService } from '../shelter.service'
import { Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import {
  UniqueEmailValidator,
  UniqueMobileValidator,
} from '../shared/validators'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-shelter-create',
  templateUrl: './shelter-create.component.html',
  styleUrl: './shelter-create.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ShelterCreateComponent implements OnInit {
  shelterForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private shelterService: ShelterService,
    private uniqueEmailValidator: UniqueEmailValidator,
    private uniqueMobileValidator: UniqueMobileValidator,
    private router: Router,
  ) {}

  ngOnInit() {
    this.shelterForm = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator),
        ],
        updateOn: 'blur', // When form loses focus
      }),
      mobile: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[+0-9]*$')],
        asyncValidators: [
          this.uniqueMobileValidator.validate.bind(this.uniqueMobileValidator),
        ],
        updateOn: 'blur',
      }),
    })
  }

  onSubmit(): void {
    const shelter = new Shelter(this.shelterForm.value)
    this.shelterService.createResource({ body: shelter }).subscribe({
      next: (addedShelter: Shelter) => {
        // TODO: navigate to addedShelter.uri
        this.router.navigate(['shelters'])
      },
    })
  }

  get name() {
    return this.shelterForm.get('name')
  }

  get email() {
    return this.shelterForm.get('email')
  }

  get mobile() {
    return this.shelterForm.get('mobile')
  }
}
