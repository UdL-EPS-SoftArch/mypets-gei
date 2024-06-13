import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterLink } from '@angular/router';
import { MedicalRecord } from "../medical-record";
import { MedicalRecordService } from "../medical-record.service";
import { Pet } from "../../pet/pet";
import { CommonModule } from "@angular/common";
import { AuthenticationBasicService } from "../../login-basic/authentication-basic.service";
import { PetService } from "../../pet/pet.service";
import { filter } from 'rxjs/operators';

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
  petId: any;
  petName: string = '';
  selectedPet: Pet | undefined;

  constructor(private authenticationService: AuthenticationBasicService,
              private medicalRecordService: MedicalRecordService,
              private petService: PetService,
              private router: Router,
              private route: ActivatedRoute) {

    // Subscribe to router events to detect NavigationEnd
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (this.router.url.startsWith('/medical-records')) {
        // Call a custom method to refresh data
        this.initializeComponent();
      }
    });
  }

  ngOnInit(): void {

    this.initializeComponent();
  }

  initializeComponent() {
    this.route.params.subscribe(params => {
      console.log(params) // log the entire params object
      console.log(params['petId']) // log the value of id

      this.petId = params['petId'];
    });

    if (this.petId) {
      this.fetchPetName(this.petId);
      this.fetchPet(this.petId);
      console.log("petId", this.petId);
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

  editRecord(record: any) {
    const recordId = record.id;
    const petUrl = record._links.pet.href;

    this.petService.getPetByUrl(petUrl).subscribe({
      next: (pet) => {
        this.selectedPet = pet;
        const lastIndex = pet.uri.lastIndexOf('/');
        this.selectedPet.id = Number(lastIndex > -1 ? pet.uri.substring(lastIndex + 1) : '');
        console.log(this.selectedPet, " - Selected Pet");

        this.router.navigate([`/medical-records/${recordId}/${this.selectedPet.id}/edit`, {}]);
      },
      error: (error) => {
        console.error('Failed to fetch pet:', error);
        this.selectedPet = undefined;
      }
    });
  }

  deleteRecord(recordId: string) {
    this.medicalRecordService.deleteMedicalRecord(recordId).subscribe(() => {
      this.fetchMedicalRecords();
    });
  }

  addMedicalRecord() {
    this.router.navigate(['/medical-records/add']);
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  fetchPetName(petId: number) {
    this.petService.getPetById(petId).subscribe({
      next: (pet) => {
        this.petName = pet.name;
        console.log("Pet Name", this.petName);
      },
      error: (error) => {
        console.error('Failed to fetch pet name:', error);
        this.petName = '';
      }
    });
  }
}
