import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MedicalRecord} from "../medical-record";
import {MedicalRecordService} from "../medical-record.service";
import {Pet} from "../../pet/pet";
import {CommonModule} from "@angular/common";
import {Subscription} from "cypress/types/net-stubbing";

@Component({
  selector: 'app-medical-record-list',
  templateUrl: './medical-record-list.component.html',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  styleUrls: ['./medical-record-list.component.css']
})
export class MedicalRecordListComponent implements OnInit {
  medicalRecords: MedicalRecord[] = [];


  constructor(
    private medicalRecordService: MedicalRecordService,
    private router: Router,
    private route: ActivatedRoute,
) { }


  ngOnInit(): void {

    let petId: number | null = null;
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['petId']) //log the value of id

      petId = params['petId'];
    });




    if (petId) {
      this.fetchPet(petId);
      console.log("petId", petId);
    } else {
      this.fetchMedicalRecords();
      console.log("NO petId");
    }
  }

  fetchPet(petId: number) {
    this.medicalRecordService.getMedicalRecordsByPetId(petId).subscribe({
      next: (records) => {
        if (Array.isArray(records)) {
          records.forEach(record => {
            let lastIndex = record.uri.lastIndexOf('/');
            record.id = lastIndex > -1 ? record.uri.substring(lastIndex + 1) : '';
          })
          this.medicalRecords = records;
        } else {
          console.error('Data returned is not an array:', records);
        }
      },
      error: (error) => {
        console.error('Failed to fetch medical records:', error);
        this.medicalRecords = []; // Reset or handle as needed
      }
    });
  }

  fetchMedicalRecords() {
    this.medicalRecordService.getMedicalRecords().subscribe({
      next: (records) => {
        if (Array.isArray(records)) {
          records.forEach(record => {
            let lastIndex = record.uri.lastIndexOf('/');
            record.id = lastIndex > -1 ? record.uri.substring(lastIndex + 1) : '';
          })
          this.medicalRecords = records;
        } else {
          console.error('Data returned is not an array:', records);
        }
      },
      error: (error) => {
        console.error('Failed to fetch medical records:', error);
        this.medicalRecords = []; // Reset or handle as needed
      }
    });
  }


  editRecord(recordId: string) {
    this.router.navigate([`/medical-records/${recordId}/edit`]);
  }

  deleteRecord(recordId: string) {
    this.medicalRecordService.deleteMedicalRecord(recordId).subscribe(() => {
      this.fetchMedicalRecords();
    });
  }

  addMedicalRecord() {
    this.router.navigate(['/medical-records/add']);
  }
}
