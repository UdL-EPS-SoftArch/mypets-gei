import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MedicalRecord} from "../medical-record";
import {MedicalRecordService} from "../medical-record.service";
import {Pet} from "../../pet/pet";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-medical-record-add',
  templateUrl: './medical-record-add.component.html',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  styleUrls: ['./medical-record-add.component.css']
})
export class MedicalRecordAddComponent implements OnInit {
  medicalRecords: MedicalRecord[] = [];

  constructor(
    private medicalRecordService: MedicalRecordService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let medicalRecord = new MedicalRecord(
      {
        issue: 'Issue 1',
        description: 'Description 1',
        date: Date.now(),
        pet: new Pet({id: 2})
      }
    );

    this.medicalRecordService.createMedicalRecord(medicalRecord).subscribe({
      next: (response) => {
        console.log('Medical Record created:', response);
      },
      error: (error) => console.error('Error creating medical record:', error)
    });
  }

  addMedicalRecord( issue: string, description: string, date: string, pet: Pet) {
    return new MedicalRecord(
      {
        issue: issue,
        description: description,
        date: date,
        pet: pet
      }
    );
  }

}
