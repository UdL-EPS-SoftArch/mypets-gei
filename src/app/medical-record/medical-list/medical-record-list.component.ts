import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from './medical-record.service';
import { ActivatedRoute } from '@angular/router';
import { MedicalRecord } from './medical-record.model';

@Component({
  selector: 'app-medical-record-list',
  templateUrl: './medical-record-list.component.html',
  styleUrls: ['./medical-record-list.component.css']
})
export class MedicalRecordListComponent implements OnInit {
  petId!: number;
  medicalRecords!: MedicalRecord[];

  constructor(
    private medicalRecordService: MedicalRecordService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.params['petId'];
    this.fetchMedicalRecords();
  }

  fetchMedicalRecords() {
    this.medicalRecordService.getMedicalRecords(this.petId).subscribe(records => {
      this.medicalRecords = records;
    });
  }
}
