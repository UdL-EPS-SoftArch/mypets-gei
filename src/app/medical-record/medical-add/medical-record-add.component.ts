import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from './medical-record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalRecord } from './medical-record.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-record-add',
  templateUrl: './medical-record-add.component.html',
  styleUrls: ['./medical-record-add.component.css']
})
export class MedicalRecordAddComponent implements OnInit {
  petId!: number;
  medicalRecordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medicalRecordService: MedicalRecordService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.params['petId'];
    this.initForm();
  }

  initForm() {
    this.medicalRecordForm = this.fb.group({
      issue: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.medicalRecordForm.valid) {
      const newRecord: MedicalRecord = this.medicalRecordForm.value;
      this.medicalRecordService.addMedicalRecord(this.petId, newRecord).subscribe(() => {
        this.router.navigate([`/pets/${this.petId}/medical-records`]);
      });
    }
  }
}
