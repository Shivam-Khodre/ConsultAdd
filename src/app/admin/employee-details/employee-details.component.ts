import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from 'src/app/service/employee-data.service';

export interface EmployeeDetails {
  username: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  cinfo: string;
}
export interface VaccineDetails {
  username: string;
  name: string;
  is_first_doze_take: string;
  vaccine_name: string;
  first_doze_date: Date;
  is_second_doze_take: string;
  second_doze_date: Date;
  is_fully_vaccinated: string;
}

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(private router: Router, private api: EmployeeDataService) {}

  VaccinedisplayedColumns: string[] = [
    'username',
    'name',
    'is_first_doze_take',
    'vaccine_name',
    'first_doze_date',
    'is_second_doze_take',
    'second_doze_date',
    'is_fully_vaccinated',
    'actions',
  ];
  EmployeedisplayedColumns: string[] = [
    'username',
    'name',
    'email',
    'age',
    'gender',
    'cinfo',
  ];
  employeeDetailsDataSource: EmployeeDetails[] = [];
  vaccineeeDetailsDataSource: VaccineDetails[] = [];

  ngOnInit(): void {
    this.api.getDetails('user/empData').subscribe((res: any) => {
      this.employeeDetailsDataSource = res.data;
    });
    this.api.getDetails('user/vaccineData').subscribe((res: any) => {
      this.vaccineeeDetailsDataSource = res.data;
    });
  }

  onVaccineDetailsClick() {
    this.router.navigate(['vaccineDetails'], { state: { isAdmin: true } });
  }

  onDeleteClick(event: VaccineDetails) {
    this.api
      .deleteVaccineDetails('user/deleteVaccineData', {
        username: event.username,
      })
      .subscribe((res: any) => {
        if (res.status) {
          let data = this.vaccineeeDetailsDataSource;
          let i = data.indexOf(event);
          data.splice(i, 1);
          this.vaccineeeDetailsDataSource = [...data];
        }
      });
  }
}
