import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BusinessCardsDTo } from '../Models/BusinessCardsDTo';

@Injectable({
  providedIn: 'root' // This makes the service available throughout the application
})
export class BusinessCardService {
  deleteBusinessCard(id: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:7156/api/BusinessCards'; // Your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all business cards
  getBusinessCards(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Delete business card by ID
  deleteCard(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
// Add a method for the filter API
filterBusinessCards(filters: any): Observable<any[]> {
  const params = new HttpParams()
    .set('name', filters.name)
    .set('gender', filters.gender)
    .set('dateOfBirth', filters.dateOfBirth)
    .set('email', filters.email)
    .set('phone', filters.phone);

  return this.http.get<any[]>(`${this.apiUrl}/filter`, { params }).pipe(
    tap(data => console.log('Filtered data:', data)) // Add this line
  );
}
addBusinessCard(card: BusinessCardsDTo): Observable<BusinessCardsDTo> {
  return this.http.post<BusinessCardsDTo>(this.apiUrl, card); // Send a POST request to add the card
}

exportToCsv(): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/export/csv`, { responseType: 'blob' });
}

exportToXml(): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/export/xml`, { responseType: 'blob' });
}
  // Additional methods for add, update, etc., can be added here
}
