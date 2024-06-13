import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MedicalRecord} from "../medical-record";
import {MedicalRecordService} from "../medical-record.service";
import {Pet} from "../../pet/pet";
import {CommonModule} from "@angular/common";
import {Subscription} from "cypress/types/net-stubbing";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {PetService} from "../../pet/pet.service";

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
    selectedPet : Pet | undefined;

    constructor(private authenticationService: AuthenticationBasicService,
                private medicalRecordService: MedicalRecordService,
                private petService: PetService,
                private router: Router,
                private route: ActivatedRoute,
    ) { }


    ngOnInit(): void {


        this.route.params.subscribe(params => {
            console.log(params) //log the entire params object
            console.log(params['petId']) //log the value of id

            this.petId = params['petId'];
        });




        if (this.petId) {
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
}
