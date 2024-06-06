import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ShelterService } from '../shelter.service'
import {
  UniqueEmailValidator,
  UniqueMobileValidator,
} from '../shared/validators'
import { ActivatedRoute, Router } from '@angular/router'
import { Shelter } from '../shelter'
import { CommonModule } from '@angular/common'
import { ShelterVolunteersListComponent } from '../volunteer-list/volunteer-list.component'
import { CertificateAddComponent } from '../certificate-add/certificate-add.component'
import { catchError, of } from 'rxjs'

@Component({
  selector: 'app-shelter-edit',
  templateUrl: './shelter-edit.component.html',
  styleUrl: './shelter-edit.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShelterVolunteersListComponent,
    CertificateAddComponent,
  ],
})
export class ShelterEditComponent implements OnInit {
  public shelter: Shelter
  shelterForm: FormGroup
  createdAt: string
  lastUpdate: string
  shelterId: string
  isLoading: boolean
  errorFetchMsg: string

  constructor(
    private formBuilder: FormBuilder,
    private shelterService: ShelterService,
    private uniqueEmailValidator: UniqueEmailValidator,
    private uniqueMobileValidator: UniqueMobileValidator,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isLoading = true
    this.shelter = new Shelter()
    this.shelterId = this.activatedRoute.snapshot.paramMap.get('id')

    this.shelterService
      .getResource(this.shelterId)
      .pipe(
        catchError((error) => {
          this.errorFetchMsg = error.message
          return of(null)
        }),
      )
      .subscribe((_shelter) => {
        if (_shelter) {
          this.shelter = _shelter
          this.createdAt = new Date(_shelter.createdAt).toLocaleString()
          this.lastUpdate = new Date(_shelter.updatedAt).toLocaleString()
          this.setUpValidators()
        }
        this.isLoading = false
      })

    this.shelterForm = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur', // When form loses focus
      }),
      mobile: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[+0-9]*$')],
        updateOn: 'blur',
      }),
      location: {},
    })
  }

  setUpValidators(): void {
    this.shelterForm.setValue({
      name: this.shelter.name,
      email: this.shelter.email,
      mobile: this.shelter.mobile,
      location: this.shelter.locatedAt ?? '',
    })

    this.email.valueChanges.subscribe((newValue: string) => {
      if (newValue != this.shelter.email) {
        this.email.setAsyncValidators(
          this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator),
        )
      } else {
        this.email.clearAsyncValidators()
      }
      this.email.updateValueAndValidity({ emitEvent: false })
    })

    this.mobile.valueChanges.subscribe((newValue: string) => {
      if (newValue != this.shelter.mobile) {
        this.mobile.setAsyncValidators(
          this.uniqueMobileValidator.validate.bind(this.uniqueMobileValidator),
        )
      } else {
        this.mobile.clearAsyncValidators()
      }
      this.mobile.updateValueAndValidity({ emitEvent: false })
    })
  }

  onSubmit(): void {
    this.shelter.name = this.shelterForm.value.name
    this.shelter.email = this.shelterForm.value.email
    this.shelter.mobile = this.shelterForm.value.mobile
    this.shelter.updatedAt = new Date()
    this.shelterService
      .patchResource(this.shelter)
      .subscribe((updatedShelter: Shelter) => {
        // this.router.navigate([updatedShelter.uri])
        this.router.navigate(['shelters'])
      })
  }

  onCancel() {
    this.router.navigate(['shelters'])
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
