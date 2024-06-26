import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from "../medical-record.service";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicalRecord } from "../medical-record";

@Component({
  selector: 'app-medical-record-edit',
  templateUrl: './medical-record-edit.component.html',
  styleUrls: ['./medical-record-edit.component.css']
})
export class MedicalRecordEditComponent implements OnInit {
  petId!: number;
  recordId!: number;
  description!: string;
  issue!: string;

  medicalRecord = new MedicalRecord();

  medicalRecordForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private medicalRecordService: MedicalRecordService,
      private route: ActivatedRoute,
      private router: Router
  ) {
    this.medicalRecordForm = this.fb.group({
      issue: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      petId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.recordId = Number(this.route.snapshot.paramMap.get('recordId'));

    this.medicalRecordService.getMedicalRecord(this.recordId).subscribe({
      next: (record) => {
        this.medicalRecord = record;
        this.issue = this.medicalRecord.issue;
        this.description = this.medicalRecord.description;
        this.petId = this.route.snapshot.params['petId'];
        this.medicalRecordForm.patchValue({
          issue: this.issue,
          description: this.description,
          date: new Date(this.medicalRecord.date),
          petId: this.petId
        });
      },
      error: (error) => {
        console.error('Error fetching medical record');
      }
    });
  }

  editMedicalRecord() {
    if (this.medicalRecordForm.invalid) {
      return;
    }

    const { issue, description, date, petId } = this.medicalRecordForm.value;

    let medicalRecord = new MedicalRecord({
      issue: issue,
      description: description,
      date: date,
      pet: `/pets/${petId}`
    });

    this.medicalRecordService.updateMedicalRecord(this.recordId, medicalRecord).subscribe({
      next: (response) => {
        console.log('Medical Record updated:', response);

        const reloadTimestamp = new Date().getTime();
        const navigationExtras: NavigationExtras = {
          queryParams: { reload: reloadTimestamp }
        };
        this.router.navigate(['/medical-records', this.petId], navigationExtras);
      },
      error: (error) => console.error('Error updating medical record:', error)
    });
  }
}
