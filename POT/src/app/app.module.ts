import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AdminregistrationComponent } from './adminregistration/adminregistration.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AttendanceComponent } from './employee-dashboard/attendance/attendance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'home', component: HomeComponent,
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: AdminregistrationComponent},
  { path: 'empDashBoard', component: EmployeeDashboardComponent},
  { path: 'empDashBoard/monthlyAttendance', component: AttendanceComponent},
  { path:'adminDashBoard',component:AdminDashBoardComponent},
  {path:'login/admin',component:AdminLoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminregistrationComponent,
    EmployeeDashboardComponent,
    AttendanceComponent,
    AdminDashBoardComponent,
    AdminLoginComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
