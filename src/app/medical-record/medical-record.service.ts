import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from "../../environments/environment";
import { MedicalRecord } from "./medical-record";
import { catchError, map } from "rxjs/operators";
import {HateoasResourceOperation, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Pet} from "../pet/pet";

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService extends HateoasResourceOperation<MedicalRecord> {

  private apiUrl = `${environment.API}/medicalRecords`;

  constructor(private http: HttpClient) {
    super(MedicalRecord);
  }

  getMedicalRecordsByPetId(petId: number): Observable<MedicalRecord[]> {
    return this.searchCollection('findByPet', { params: { pet: `/pets/${petId}` } }).pipe(
      map((collection: ResourceCollection<MedicalRecord>) => collection.resources),
      catchError(() => {
        console.error('Error fetching medical records for pet');
        return of([]); // Returns empty array to indicate an error occurred
      })
    );
  }


  getMedicalRecords(): Observable<MedicalRecord[]> {
    return this.http.get<{ _embedded: { medicalRecords: MedicalRecord[] } }>(this.apiUrl).pipe(
      map(response => response._embedded ? response._embedded.medicalRecords : []),
      catchError(() => {
        console.error('Error fetching medical records');
        return of([]); // Return an empty array on error
      })
    );
  }

  getMedicalRecord(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        console.error('Error fetching medical record');
        return of(null); // Return null to indicate an error occurred without details
      })
    );
  }

  createMedicalRecord(medicalRecord: MedicalRecord): Observable<any> {
    return this.http.post(this.apiUrl, medicalRecord).pipe(
      catchError(() => {
        console.error('Error creating medical record');
        return of(null); // Return null to indicate an error occurred without details
      })
    );
  }

  updateMedicalRecord(id: number, medicalRecord: MedicalRecord): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, medicalRecord).pipe(
      catchError(() => {
        console.error(`Error updating medical record with id ${id}`);
        return of(null); // Return null to indicate an error occurred without details
      })
    );
  }

  deleteMedicalRecord(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        console.error(`Error deleting medical record with id ${id}`);
        return of(); // Return empty observable on error
      })
    );
  }

}
