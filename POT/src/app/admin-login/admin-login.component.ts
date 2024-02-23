import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AdminAuthenticationService } from '../admin-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  @ViewChild('username') username: ElementRef
  @ViewChild('password') password: ElementRef


  authservice: AdminAuthenticationService = inject(AdminAuthenticationService)
  router: Router = inject(Router)
  check: boolean = false;
  msg: string = '';

  OnLoginClicked() {
    const emailId1 = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;


    const employee = this.authservice.login(emailId1, password);
    employee.subscribe((data: any) => {
      console.log("Data : ", data);
      if (data != null) {
        this.check = true;
        this.msg = data;
        const contractorData = JSON.stringify(data);
        sessionStorage.setItem("AdminLogin", contractorData);
        this.router.navigate(['/adminDashBoard']);
      }
      else {
        this.check = true;
        this.msg = 'Invalid Credentials';
      }
    },
      err => {
        console.log(err);
        alert('Invalid Username or Password');
      });
  }
  closeform() {
    this.router.navigate(['/login']);

  }
}
