
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegService } from '../reg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminregistration',
  templateUrl: './adminregistration.component.html',
  styleUrls: ['./adminregistration.component.css']
})
export class AdminregistrationComponent {
  contractorForm: FormGroup;
  router: Router = inject(Router);

  constructor(private fb: FormBuilder, private http: HttpClient, private adminreg: RegService) {
    this.contractorForm = this.fb.group({
      contractorName: ['', Validators.required],
      birthDate: ['', Validators.required],
      contactReq: this.fb.group({
        emailId: ['', [Validators.required, Validators.email]],
        mobileNumber: [null, Validators.required],
      }),
      addressReq: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: [null, Validators.required],
      }),
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contractorForm.valid) {
      const formData = this.contractorForm.value;
      const jsonData = JSON.stringify(formData, null, 2); 

      
      console.log('Registration Data:', jsonData);

      
      this.adminreg.registerContractor(formData)
        .subscribe(response => {
          console.log('Registration successful', response);
          alert('Registration successful');
          this.router.navigate(['/login']);
        }, error => {
          console.error('Error in registration', error);
          alert('Error in registration');
        });
    }
  }
}
