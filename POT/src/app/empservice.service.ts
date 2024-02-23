


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } /******/ from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {

  constructor(private http:HttpClient) { }
  
  get(obj1){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
       console.log(obj1);
    return this.http.post('http://localhost:8080/employee/employeeLogin', obj1, {responseType:'json'})
  }
}