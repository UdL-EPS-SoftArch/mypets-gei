import { Component, OnInit } from '@angular/core';
import {MedicalRecordService} from "../medical-record.service";
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormsModule} from '@angular/forms';
import {MedicalRecord} from "../medical-record";

@Component({
  selector: 'app-medical-record-edit',
  templateUrl: './medical-record-edit.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./medical-record-edit.component.css']
})
export class MedicalRecordEditComponent implements OnInit {
  petId!: number;
  recordId!: number;
  day!: number;
  month!: number;
  year!: number;
  description!: string;
  issue!: string;

  medicalRecord = new MedicalRecord();


  constructor(
    private fb: FormBuilder,
    private medicalRecordService: MedicalRecordService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recordId = Number(this.route.snapshot.paramMap.get('recordId'));

    this.medicalRecordService.getMedicalRecord(this.recordId).subscribe({
      next: (record) => {
        this.medicalRecord = record;
        this.issue = this.medicalRecord.issue;
        this.description = this.medicalRecord.description;
        console.log('Medical Record Pet:', record);
        this.petId = this.route.snapshot.params['petId'];
        this.parseDate(this.medicalRecord.date);
        console.log('Parsed date:', this.day, this.month, this.year);
      },
      error: (error) => {
        console.error('Error fetching medical record');
      }

    });
  }
  editMedicalRecord(issue: string, description: string, day: number, month: number, year: number) {
    console.log(this.petId, " - Id");
    let medicalRecord = new MedicalRecord(
      {
        issue: issue,
        description: description,
        date: new Date(year, month, day),
        pet: `/pets/${this.petId}`
      }
    );
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

  parseDate(dateString: string) {
    const date = new Date(dateString);
    this.day = date.getUTCDate();
    this.month = date.getUTCMonth() + 1; // getUTCMonth() returns month index starting from 0
    this.year = date.getUTCFullYear();
  }


}
