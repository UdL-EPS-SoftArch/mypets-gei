import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms'
import { ShelterService } from '../shelter.service'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private shelterService: ShelterService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.shelterService.findByEmail(control.value).pipe(
      map((shelters) =>
        shelters.resources.length > 0 ? { emailTaken: true } : null,
      ),
      catchError(() => of(null)),
    )
  }
}

@Injectable({ providedIn: 'root' })
export class UniqueMobileValidator implements AsyncValidator {
  constructor(private shelterService: ShelterService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.shelterService.findByMobile(control.value).pipe(
      map((shelters) =>
        shelters.resources.length > 0 ? { mobileTaken: true } : null,
      ),
      catchError(() => of(null)),
    )
  }
}
