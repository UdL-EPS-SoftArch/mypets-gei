import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from "../../environments/environment";
import {MedicalRecord} from "./medical-record";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  private apiUrl = `${environment.API}/medicalRecords`;

  constructor(private http: HttpClient) { }

  getMedicalRecordsByPet(petId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/findByPet?pet=${petId}`);
  }

  getMedicalRecords(): Observable<MedicalRecord[]> {
    return this.http.get<{_embedded: {medicalRecords: MedicalRecord[]}}>(this.apiUrl)
      .pipe(
        map(response => response._embedded ? response._embedded.medicalRecords : []),
        catchError(error => {
          console.error('Error fetching medical records', error);
          return of([]); // Return an empty array on error
        })
      );
  }


  getMedicalRecord(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createMedicalRecord(medicalRecord: MedicalRecord): Observable<any> {
    return this.http.post(this.apiUrl, medicalRecord);
  }

  updateMedicalRecord(id: number, medicalRecord: MedicalRecord): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, medicalRecord);
  }

  deleteMedicalRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting medical record with id ${id}`, error);
        return of(); // Return empty observable on error
      })
    );
  }

}
