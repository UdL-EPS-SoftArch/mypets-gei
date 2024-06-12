import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MedicalRecord} from "../medical-record";
import {MedicalRecordService} from "../medical-record.service";
import {Pet} from "../../pet/pet";
import {CommonModule} from "@angular/common";
import {Subscription} from "cypress/types/net-stubbing";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";

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

    constructor(private authenticationService: AuthenticationBasicService,
                private medicalRecordService: MedicalRecordService,
                private router: Router) { }

    ngOnInit(): void {
        this.fetchMedicalRecords();
    }

    fetchMedicalRecords() {
        this.medicalRecordService.getMedicalRecords().subscribe({
            next: (records) => {
                this.medicalRecords = records;
            },
            error: (error) => {
                console.error('Failed to fetch medical records:', error);
                this.medicalRecords = []; // Reset or handle as needed
            }
        });
    }

    editRecord(record: MedicalRecord) {
        console.log('Editing record:', record);
        // Add navigation logic to edit the selected medical record
    }

    deleteRecord(recordId: string) {
        this.medicalRecordService.deleteMedicalRecord(recordId).subscribe(() => {
            this.fetchMedicalRecords(); // Refresh the list after deletion
        });
    }

    addMedicalRecord() {
        this.router.navigate(['/medical-records/add']);
    }

    isRole(role: string): boolean {
        return this.authenticationService.isRole(role);
    }
}
