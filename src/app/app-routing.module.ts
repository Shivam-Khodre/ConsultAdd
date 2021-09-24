import { AuthGuard } from './auth.guard';
import { EmployeeDetailsComponent } from './admin/employee-details/employee-details.component';
import { VaccinationRegistrationComponent } from './vaccination-registration/vaccination-registration.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './employee/registration/registration.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/login"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registration",
    component: RegistrationComponent
  },
  {
    path: "vaccineDetails",
    component: VaccinationRegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employeeDetails",
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
