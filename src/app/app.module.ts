import { LoginComponent } from './login/login.component';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VaccinationRegistrationComponent } from './vaccination-registration/vaccination-registration.component';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModuleModule } from './custom-material-module/custom-material-module.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VaccinationRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    EmployeeModule,
    AdminModule,
    FormsModule,
    CustomMaterialModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
