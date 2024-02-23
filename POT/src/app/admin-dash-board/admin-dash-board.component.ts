import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceClassService } from '../admin-service-class.service';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent {
  deleteStatus: boolean = false;
  deleteMsg: string;
loginReq: any;


  constructor(private route: Router, private service: AdminServiceClassService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  AllEmployess: any;
  showEmpForm: boolean = false;
  empDetails: any;
  formTitle: string = '';
  showpassword: boolean = true;
  tempEmpId: number;
  upadeForm: boolean = false;


  EmployeeDetails = {
    "employeeCode": 0,
    "employeeName": null,
    "contactReq":
    {
      "emailId": null,
      "mobileNumber": null,
    },
    "addressResponse":
    {
      "street": null,
      "city": null,
      "state": null,
      "zipcode": null,
    },
  }


  //form Binding
  addEmployeeForm: FormGroup = new FormGroup({
    "employeeName": new FormControl(""),
    "contactReq": new FormGroup(
      {
        "emailId": new FormControl(""),
        "mobileNumber": new FormControl(""),
      }
    ),
    "addressReq": new FormGroup(
      {
        "street": new FormControl(""),
        "city": new FormControl(""),
        "state": new FormControl(""),
        "zipcode": new FormControl("")
      }),
    "password": new FormControl(""),
    "loginReq": new FormGroup(
      {
        "emailId": new FormControl(""),
        "password": new FormControl("")
      }
    )
  });



  contracterDetails =
    {

    }

  //logout Functionality
  onLogoutBtnClicked() {
    
    sessionStorage.removeItem('AdminLogin');
    this.route.navigate(['/home']);
  }

  emp=JSON.parse(sessionStorage.getItem('AdminLogin'))
  //fetching all Employee Details.
  getAllEmployees() {
   
    
    console.log(this.emp)
    let contracterDetails =
    {
      "emailId": this.emp.contact.emailId,
      "password": this.emp.password
    }

    this.service.getAllEmployeeDetails(contracterDetails).subscribe((data) => {
  
      this.AllEmployess = data;
    })
  }

  OnAddEmployeeBtnClicked() {
    this.upadeForm = false;
    this.showpassword = true;
    this.showEmpForm = true;
    this.formTitle = "Add Employee";
    this.addEmployeeForm = new FormGroup({
      "employeeName": new FormControl(""),
      "contactReq": new FormGroup(
        {
          "emailId": new FormControl(""),
          "mobileNumber": new FormControl(""),
        }
      ),
      "addressReq": new FormGroup(
        {
          "street": new FormControl(""),
          "city": new FormControl(""),
          "state": new FormControl(""),
          "zipcode": new FormControl("")
        }),
      "password": new FormControl(""),
      "loginReq": new FormGroup(
        {
          "emailId": new FormControl(""),
          "password": new FormControl("")
        }
      )
    });
  }

  getContracterDetails() {
    // console
  }


  onEmpFromCancelBtnClicked() {
    this.showEmpForm = false;
  }

  SaveEmployee() {
    this.showEmpForm = false
    const formData = this.addEmployeeForm.value;
    console.log(formData);


    if (formData.password == null) {
      this.EmployeeDetails = {
        "employeeCode": this.tempEmpId,
        "employeeName": formData.employeeName,
        "contactReq":
        {
          "emailId": formData.contactReq.emailId,
          "mobileNumber": formData.contactReq.mobileNumber,
        },
        "addressResponse":
        {
          "street": formData.addressReq.street,
          "city": formData.addressReq.city,
          "state": formData.addressReq.state,
          "zipcode": formData.addressReq.zipcode,
        },
      }
      this.service.updateEmployee(this.EmployeeDetails).subscribe((data: any) => {
         this.getAllEmployees();
      });
    }
    else {
      let empdetails = {
        "employeeName": formData.employeeName,
        "contactReq":
        {
          "emailId": formData.contactReq.emailId,
          "mobileNumber": formData.contactReq.mobileNumber,
        },

        "addressReq":
        {
          "street": formData.addressReq.street,
          "city": formData.addressReq.city,
          "state": formData.addressReq.state,
          "zipcode": formData.addressReq.zipcode,
        },
        "password": formData.password,
        "loginReq":
        {
          "emailId": this.emp.contact.emailId,
          "password": this.emp.password
        }


      }
      this.service.addEmployee(empdetails).subscribe((data:any)=>
      {
        this.deleteStatus=true
        this.deleteMsg=data
        setTimeout(()=>{
            this.deleteStatus=false
        },5000)
        
      },error=>{
        this.deleteStatus=true
        this.deleteMsg=error;
        setTimeout(()=>{
            this.deleteStatus=false
        },5000)
      }
      );
      this.getAllEmployees();
    
    }

  }

  onEditClick(id: number) {
    this.upadeForm = true;
    this.formTitle = 'Update Employee Details';
    this.showEmpForm = true;
    let empDetails: any;
    this.showpassword = false;
    this.service.getEmployeeDetails(id).subscribe((data: any) => {
      this.tempEmpId = data.employeeCode;


      //to display to frontend.
      this.addEmployeeForm = new FormGroup({
        "employeeName": new FormControl(data.employeeName),
        "contactReq": new FormGroup(
          {
            "emailId": new FormControl(data.contact.emailId),
            "mobileNumber": new FormControl(data.contact.mobileNumber),
          }
        ),
        "addressReq": new FormGroup(
          {
            "street": new FormControl(data.addressResponse.street),
            "city": new FormControl(data.addressResponse.city),
            "state": new FormControl(data.addressResponse.state),
            "zipcode": new FormControl(data.addressResponse.zipcode)
          }),
        "password": new FormControl(),
        "loginReq": new FormGroup(
          {
            "emailId": new FormControl(""),
            "password": new FormControl("")
          }
        )
      });
      this.empDetails = data;
    })
    console.log(this.empDetails);

  }


  DeleteEmployee(employee: any) {

    this.service.deleteEmployeeRecord(employee).subscribe((data: any) => {
      this.getAllEmployees();
      console.log(data)
      this.deleteStatus = true;
      this.deleteMsg = data;
      setTimeout(() => {
        this.deleteStatus = false;
      }, 5000)
    },
      error => {
        setTimeout(() => {
          this.deleteStatus = false;
        }, 5000)
        this.deleteMsg = error;
      })

  }

}
