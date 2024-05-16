import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from './medical-record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalRecord } from './medical-record.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-record-edit',
  templateUrl: './medical-record-edit.component.html',
  styleUrls: ['./medical-record-edit.component.css']
})
export class MedicalRecordEditComponent implements OnInit {
  petId!: number;
  recordId!: number;
  medicalRecordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medicalRecordService: MedicalRecordService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.params['petId'];
    this.recordId = this.route.snapshot.params['recordId'];
    this.initForm();
    this.fetchMedicalRecord();
  }

  initForm() {
    this.medicalRecordForm = this.fb.group({
      issue: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  fetchMedicalRecord() {
    this.medicalRecordService.getMedicalRecord(this.petId, this.recordId).subscribe(record => {
      this.medicalRecordForm.patchValue(record);
    });
  }

  onSubmit() {
    if (this.medicalRecordForm.valid) {
      const updatedRecord: MedicalRecord = this.medicalRecordForm.value;
      this.medicalRecordService.updateMedicalRecord(this.petId, this.recordId, updatedRecord).subscribe(() => {
        this.router.navigate([`/pets/${this.petId}/medical-records`]);
      });
    }
  }
}
