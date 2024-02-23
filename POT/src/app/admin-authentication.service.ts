import { Injectable } from '@angular/core';
import { AdminloginService } from './adminlogin.service';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationService {
  handleError: any;

  constructor(private emps: AdminloginService) { }

  isLoggedIn: boolean = false;
  errMsg;
  body;


  login(emailId1: string, password: string): Observable<any> {
    let obj = { emailId: emailId1, password: password };
  
    return this.emps.get(obj).pipe(
      tap(us => {
        const usersArray = Object.values(us);
        let contractor = usersArray.filter(u => u.emailId === emailId1 && u.password === password);
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
}