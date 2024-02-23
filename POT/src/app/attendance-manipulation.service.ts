import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SymbolDisplayPartKind } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class AttendanceManipulationService 
{
  constructor(private http:HttpClient) { }

  checkInTime(checkInData:any)
  {
    // console.log("checkin data from service class",checkInData);
    return this.http.post("http://localhost:8080/employee/checkIn",checkInData,{responseType:'text'});
  }


  checkOutTime(checkOutData:any)
  {
    // console.log("checkout data from service class",checkOutData);
    return this.http.put("http://localhost:8080/employee/checkOut",checkOutData,{responseType:'text'});
  };

  getAllAttendanceOfEmployee(empDetails:any)
  {
    // console.log(empDetails);
    return this.http.post("http://localhost:8080/employee/attendanceSheet",empDetails);
  }
}
