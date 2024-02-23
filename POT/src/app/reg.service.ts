
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegService {
  private apiUrl = 'http://localhost:8080/contractor/registration';

  constructor(private http: HttpClient) { }

  registerContractor(formData: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'text');

      const jsonData = JSON.stringify(formData, null, 2); 
       console.log('Sending JSON data:', jsonData);

       return this.http.post(this.apiUrl, formData, { responseType:'text' })
     
  }
}
