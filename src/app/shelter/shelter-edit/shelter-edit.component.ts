import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ShelterService } from '../shelter.service'
import {
  UniqueEmailValidator,
  UniqueMobileValidator,
} from '../shared/validators'
import { ActivatedRoute, Router } from '@angular/router'
import { Shelter } from '../shelter-data'

@Component({
  selector: 'app-shelter-edit',
  templateUrl: './shelter-edit.component.html',
  styleUrl: './shelter-edit.component.css',
})
export class ShelterEditComponent implements OnInit {
  public oldShelter: Shelter
  shelterForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private shelterService: ShelterService,
    private uniqueEmailValidator: UniqueEmailValidator,
    private uniqueMobileValidator: UniqueMobileValidator,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.oldShelter = new Shelter()
    const shelterId = this.activatedRoute.snapshot.paramMap.get('id')
    this.shelterService.getResource(shelterId).subscribe((_shelter) => {
      this.oldShelter = _shelter
      this.shelterForm.setValue({
        name: this.oldShelter.name,
        email: this.oldShelter.email,
        mobile: this.oldShelter.mobile,
      })
    })

    this.shelterForm = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      email: new FormControl(this.oldShelter.email, {
        validators: [Validators.required, Validators.email],
        asyncValidators: true
          ? [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)]
          : [],
        updateOn: 'blur', // When form loses focus
      }),
      mobile: new FormControl(this.oldShelter.mobile, {
        validators: [Validators.required, Validators.pattern('^[+0-9]*$')],
        asyncValidators: [
          this.uniqueMobileValidator.validate.bind(this.uniqueMobileValidator),
        ],
        updateOn: 'blur',
      }),
    })
  }

  onSubmit(): void {}

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
