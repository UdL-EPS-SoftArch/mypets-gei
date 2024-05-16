import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PetData } from './pet-data';

@Injectable({
    providedIn: 'root'
})
export class PetService {
    private baseUrl = 'http://localhost:8080/pets'; // Adjust the base URL as per your backend API

    constructor(private http: HttpClient) { }

    addPet(pet: PetData): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}`, pet).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error adding pet:', error);
                return throwError('Something went wrong; please try again later.');
            })
        );
    }
}
