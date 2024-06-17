import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MedicalRecord} from "../medical-record";
import {MedicalRecordService} from "../medical-record.service";
import {Pet} from "../../pet/pet";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PetService} from "../../pet/pet.service";

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
    private petService: PetService,
    private medicalRecordService: MedicalRecordService,
    private router: Router
  ) { }

  ngOnInit(): void {
    return;
  }

  createDate(day: number, month: number, year: number) {
    return new Date(year, month, day);
  }

  addMedicalRecord(issue: string, description: string, date: Date, petId: number) {
    // Check if petId exists
    this.petService.getPetById(petId).subscribe({
      next: (pet: Pet) => {
        if (pet) {
          let medicalRecord = new MedicalRecord({
            issue: issue,
            description: description,
            date: date,
            pet: `/pets/${petId}`
          });

          this.medicalRecordService.createMedicalRecord(medicalRecord).subscribe({
            next: (response) => {
              alert('Medical Record created:');
                this.router.navigate(['/medical-records/', this.petId]);
            },
            error: (error) => console.error('Error creating medical record:', error)
          });

          this.router.navigate(['/medical-records']);
        } else {
          alert(`Pet with ID ${petId} does not exist.`);
        }
      },
      error: (error) => alert(`Pet with ID ${petId} does not exist.`)
    });
  }

}
