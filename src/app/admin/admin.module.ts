import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CustomMaterialModuleModule } from '../custom-material-module/custom-material-module.module';
import { FormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';



@NgModule({
  declarations: [
  
    EmployeeDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    CustomMaterialModuleModule
  ]
})
export class AdminModule { }
