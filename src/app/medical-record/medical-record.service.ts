import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalRecord } from './medical-record.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  private baseUrl = 'http://your-backend-url/api';

  constructor(private http: HttpClient) { }

  getMedicalRecords(petId: number): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`${this.baseUrl}/pets/${petId}/medical-records`);
  }

  getMedicalRecord(petId: number, recordId: number): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${this.baseUrl}/pets/${petId}/medical-records/${recordId}`);
  }

  addMedicalRecord(petId: number, record: MedicalRecord): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(`${this.baseUrl}/pets/${petId}/medical-records`, record);
  }

  updateMedicalRecord(petId: number, recordId: number, record: MedicalRecord): Observable<MedicalRecord> {
    return this.http.put<MedicalRecord>(`${this.baseUrl}/pets/${petId}/medical-records/${recordId}`, record);
  }

  deleteMedicalRecord(petId: number, recordId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/pets/${petId}/medical-records/${recordId}`);
  }
}
