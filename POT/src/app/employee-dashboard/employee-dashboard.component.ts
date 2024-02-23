import { Component } from '@angular/core';
import { interval, retry, timeInterval } from 'rxjs';
import { EmpserviceService } from '../empservice.service';
import { AttendanceManipulationService } from '../attendance-manipulation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  
 ngOnInit()
 {
  this.getAllAttendanceOfEmployeee();
 }

 constructor(private service: AttendanceManipulationService,private route:Router) { }

//  ngDoCheck()
//  {
//   this.getAllAttendanceOfEmployeee();
//  }

  responseBack: any = "";
  back: boolean = false;
  monthArr:string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  check: string = 'checkIn';
  sec: number = 0;
  min: number = 0;
  hrs: number = 0;
  interval: any;
  allAttendanceOfEmployee:any;
  showEmpDetails:boolean=false;
  loginDetails = JSON.parse(sessionStorage.getItem("employeeLogin"));
  showMonthlyAttendance:boolean = false;
  monthlyAttendanceArr:any;
  presentDate:any = new Date();
  DiplayPresentDate = this.presentDate.getDate()+" "+this.monthArr[this.presentDate.getMonth()]+" "+this.presentDate.getFullYear();
  displayTime:string;

  employeeDetails = {
  empid: this.loginDetails.employeeCode,
  empName: this.loginDetails.employeeName,
  email:this.loginDetails.contact.emailId,
  mobileNum:this.loginDetails.contact.mobileNumber,
  street:this.loginDetails.addressResponse.street,
  city:this.loginDetails.addressResponse.city,
  state:this.loginDetails.addressResponse.state,
  pinCode:this.loginDetails.addressResponse.zipcode
  }

  onInOutClicked() {

    this.getAllAttendanceOfEmployeee();
    if (this.check === 'checkIn') {
      this.check = 'checkOut';
      this.postCheckInTime();
      
      this.interval = setInterval(() => {
        this.sec++;
        if (this.sec == 60) {
          this.sec = 0;
          this.min++;
          if (this.min == 60) {
            this.min = 0;
            this.hrs++;
          }
        }
      }, 1000);
    
    }
    else {
      this.check = 'checkIn';
      // this.resetTime();
      this.displayTime = this.hrs+" : "+this.min+" : "+this.sec;
      clearInterval(this.interval);
      this.postCheckOutTime();
    }
  }


  resetTime() {
    this.sec = 0;
    this.min = 0;
    this.hrs = 0;
  }

  formatTime(): string {
    return `${this.addZero(this.hrs)} : ${this.addZero(this.min)} : ${this.addZero(this.sec)}`;
  }


  addZero(val: number): string {
    if (val < 10) {
      return `0${val}`;
    }
    return `${val}`;
  }

  postCheckInTime() {
    // const checkInTime = new Date();
    let empId: number = this.loginDetails.employeeCode;
    let date = this.addZero(this.presentDate.getFullYear()) + "-" + this.addZero(this.presentDate.getMonth()+1) + "-" + this.addZero(this.presentDate.getDate());
    let time = this.addZero(this.presentDate.getHours()) + ":" + this.addZero(this.presentDate.getMinutes()) + ":" + this.addZero(this.presentDate.getSeconds());


    let checkInData = {
      "employeeCode": empId,
      "date": date,
      "checkInTime": time
    }
    // console.log("checkin data", checkInData);
    this.service.checkInTime(checkInData).subscribe((data: any) => {
      this.responseBack = data;
      this.back = true;
      setTimeout(() => { this.back = false }, 5000);
    });
  }

  postCheckOutTime() {
    // const checkOutTime = new Date();
    let empId: number = this.loginDetails.employeeCode;
    let date = this.addZero(this.presentDate.getFullYear()) + "-" + this.addZero(this.presentDate.getMonth()+1) + "-" + this.addZero(this.presentDate.getDate());
    let time = this.addZero(this.presentDate.getHours()) + ":" + this.addZero(this.presentDate.getMinutes()) + ":" + this.addZero(this.presentDate.getSeconds());

    let checkOutData = {
      "employeeCode": empId,
      "date": date,
      "checkoutTime": time
    }
    // console.log("checkOut data", checkOutData);
    this.service.checkOutTime(checkOutData).subscribe((data: any) => {
      this.responseBack = data;
      this.back = true;
      setTimeout(() => { this.back = false }, 5000);
    });
  }

  getAllAttendanceOfEmployeee()
  {
    // let login = JSON.parse(sessionStorage.getItem("loginDetails"));
   // console.log("login form sessionStorage ",login);
    // let curdate = new Date();
    // let day = curdate.getDate();

    let to = this.addZero(this.presentDate.getFullYear())+"-"+this.addZero(this.presentDate.getMonth()+1)+"-"+this.addZero(this.presentDate.getDate()+1)
    let from = this.addZero(this.presentDate.getFullYear())+"-"+this.addZero(this.presentDate.getMonth()+1)+"-"+this.addZero(this.presentDate.getDate()-7);
    // console.log("from date",from);
    // console.log("TO date",to);
    let empDetails = {
      "employeeId": this.loginDetails.employeeCode,
      "from": from,
      "to": to
      }

      // console.log("Employee details from getAttendance",empDetails);
      
      this.service.getAllAttendanceOfEmployee(empDetails).subscribe((data:any)=>
      {
        // console.log("attendance data from db",data);
        this.allAttendanceOfEmployee = data;
      }) 
  }

  getEmployeeDetails()
  {
    this.showEmpDetails = true;
  }

  onLogoutBtnClicked()
  {
    sessionStorage.removeItem('loginDetails');
    this.route.navigate(['/home']);
  }

  monthlyAttendance()
  {
  this.route.navigate(['empDashBoard/monthlyAttendance']);
  }
}
