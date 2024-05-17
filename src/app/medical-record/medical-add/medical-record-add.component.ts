import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MedicalRecord} from "../medical-record";
import {MedicalRecordService} from "../medical-record.service";
import {Pet} from "../../pet/pet";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-medical-record-add',
  templateUrl: './medical-record-add.component.html',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
  ],
  styleUrls: ['./medical-record-add.component.css']
})
export class MedicalRecordAddComponent implements OnInit {
  medicalRecords: MedicalRecord[] = [];
  issue: any;
  description: any;
  date: any;
  petId: any;
  day: any;
  month: any;
  year: any;

  constructor(
    private medicalRecordService: MedicalRecordService,
    private router: Router
  ) { }

  ngOnInit(): void {
    return;
  }

  createDate(day: number, month: number, year: number) {
    return new Date(year, month, day);
  }

  addMedicalRecord( issue: string, description: string, date: Date, petId: string) {
    let medicalRecord = new MedicalRecord(
      {
        issue: issue,
        description: description,
        date: date,
      }
    );

    this.medicalRecordService.createMedicalRecord(medicalRecord).subscribe({
      next: (response) => {
        console.log('Medical Record created:', response);
      },
      error: (error) => console.error('Error creating medical record:', error)
    });

  }


}
