import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalRecord } from '../medical-record';
import { MedicalRecordService } from '../medical-record.service';
import { Pet } from '../../pet/pet';
import { PetService } from '../../pet/pet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import form builder and validators
import { MatDatepickerInputEvent } from '@angular/material/datepicker'; // Import datepicker input event

@Component({
    selector: 'app-medical-record-add',
    templateUrl: './medical-record-add.component.html',
    styleUrls: ['./medical-record-add.component.css']
})
export class MedicalRecordAddComponent implements OnInit {
    medicalRecordForm: FormGroup; // Form group for medical record form
    petId: number;

    constructor(
        private formBuilder: FormBuilder, // Inject form builder
        private petService: PetService,
        private medicalRecordService: MedicalRecordService,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Initialize the form with validators
        this.medicalRecordForm = this.formBuilder.group({
            issue: ['', Validators.required],
            description: ['', Validators.required],
            date: [null, Validators.required], // Date field for datepicker
            petId: ['', Validators.required]
        });
    }

    // Function to handle datepicker input change
    dateChanged(event: MatDatepickerInputEvent<Date>) {
        this.medicalRecordForm.get('date').setValue(event.value);
    }

    addMedicalRecord() {
        if (this.medicalRecordForm.valid) {
            const { issue, description, date, petId } = this.medicalRecordForm.value;

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
                                this.router.navigate(['/medical-records']);
                            },
                            error: (error) => console.error('Error creating medical record:', error)
                        });
                    } else {
                        alert(`Pet with ID ${petId} does not exist.`);
                    }
                },
                error: (error) => alert(`Pet with ID ${petId} does not exist.`)
            });
        } else {
            alert('Please fill in all required fields.');
        }
    }
}
