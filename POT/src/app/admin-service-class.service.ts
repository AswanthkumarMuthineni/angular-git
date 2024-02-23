import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceClassService 
{


  constructor(private http:HttpClient) { }



  getAllEmployeeDetails(contractorDetails:any)
  {
    return this.http.post("http://localhost:8080/contractor/AllEmployeeDetails",contractorDetails);
  }

  addEmployee(EmployeeDetails:any)
  {
    return this.http.post("http://localhost:8080/employee/register",EmployeeDetails,{responseType:'text'});
  }

  getEmployeeDetails(id:number)
  {
    let empId = new HttpParams();
    empId = empId.append('employeeId',id);

    return this.http.get("http://localhost:8080/employee/getEmployeeDetails",{params:empId});
  }

  updateEmployee(EmployeeDetails:any)
  {
    return this.http.put("http://localhost:8080/contractor/updateEmployeeDetails",EmployeeDetails);
  }


  deleteEmployeeRecord(employee: any):Observable<any> {
    return this.http.post('http://localhost:8080/contractor/deleteEmployeeRecord',employee,{responseType:'text'})
  }
}
