import { Component } from '@angular/core';
import { AttendanceManipulationService } from 'src/app/attendance-manipulation.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent 
{
  constructor(private service:AttendanceManipulationService)
  {}

  monthlyAttendance:any;
  loginDetails = JSON.parse(sessionStorage.getItem("loginDetails"));
  showDateRangeForm:boolean=false;
  StartDate:string;
  EndDate:string;

  ngOnInit()
  {
    // this.showMonthlyAttendance = true;
    let curdate = new Date();
    let day = curdate.getDate();

    let to = this.addZero(curdate.getFullYear())+"-"+this.addZero(curdate.getMonth()+1)+"-"+this.addZero(curdate.getDate())
    let from = this.addZero(curdate.getFullYear())+"-"+this.addZero(curdate.getMonth())+"-"+this.addZero(curdate.getDate());
    
    this.choosedate(from,to);
  }

  choosedate(from:string,to:string)
  {
    let empDetails = {
      "employeeId": this.loginDetails.employeeCode,
      "from": from,
      "to": to
    }
      console.log("In choosedate method",empDetails);
      this.service.getAllAttendanceOfEmployee(empDetails).subscribe((data:any)=>
      {
        this.monthlyAttendance = data;
      }) 
  }

  addZero(val: number): string {
    if (val < 10) {
      return `0${val}`;
    }
    return `${val}`;
  }


  OnDateRangeClick()
  {
    this.showDateRangeForm = true;
  }

  OnCancelIconClick()
  {
    this.showDateRangeForm = false;
  }

  OnDateFormSubmit()
  {
    this.showDateRangeForm =false;
    console.log("In onSubmit method",this.StartDate,this.EndDate)
    this.choosedate(this.StartDate,this.EndDate);
  }

}
