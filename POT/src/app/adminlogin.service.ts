import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminloginService {

  constructor(private http:HttpClient) { }
  
  get(obj1){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
       console.log(obj1);
    return this.http.post('http://localhost:8080/contractor/login', obj1, {responseType:'json'})
  }
}
