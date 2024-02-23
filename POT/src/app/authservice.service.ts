
import { Injectable } from '@angular/core';
import { EmpserviceService } from './empservice.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private emps: EmpserviceService) { }

  isLoggedIn: boolean = false;
  errMsg;
  body;


  login(emailId1: string, password: string): Observable<any> {
    let obj = { emailId: emailId1, password: password };
  
    return this.emps.get(obj).pipe(
      tap(us => {
        const usersArray = Object.values(us);
        let contractor = usersArray.filter(u => u.emailId === emailId1 && u.password === password)[0];
        if (contractor) {
          this.isLoggedIn = true;
          this.body = contractor;
        } else {
          this.isLoggedIn = false;
        }
      }),
      catchError(err => this.handleError(err))
    );
  }
  

 
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    this.isLoggedIn = false;
  
    return throwError(error);
  }


  logout() {
    
    this.isLoggedIn = false;
  }

  
  isAuth() {
    return this.isLoggedIn;
  }
}
