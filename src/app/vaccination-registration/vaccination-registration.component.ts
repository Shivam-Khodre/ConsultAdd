import { LoginService } from './../service/login.service';
import { NgForm } from '@angular/forms';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-vaccination-registration',
  templateUrl: './vaccination-registration.component.html',
  styleUrls: ['./vaccination-registration.component.css'],
})
export class VaccinationRegistrationComponent {
  errorMessage: any;
  constructor(
    private router: Router,
    private auth: AuthService,
    private api: LoginService
  ) {
    this.isAdmin = router.getCurrentNavigation()?.extras.state?.isAdmin;
  }
  isAdmin: boolean | undefined;
  vaccine: string | undefined;
  firstDose: string | undefined;
  firstDoseDate: string | undefined;
  secondDose: string | undefined;
  secondDoseDate: string | undefined;
  vaccineList = [
    { value: 'covaccine', viewValue: 'Covaccine' },
    { value: 'covishield', viewValue: 'CoviShield' },
    { value: 'sputnik', viewValue: 'Sputnik' },
  ];
  isFirstDose: boolean = false;
  name: string | undefined;
  id: string | undefined;
  isSecondDose: boolean = false;
  ngOnInit() {
    let userData = this.auth.getUserDetails()?.[0];
    this.name = userData.name;
    this.id = userData.username;
    this.vaccine = userData.vaccine_name;
    this.firstDose = userData.is_first_doze_take;
    this.firstDoseDate = userData.first_doze_date;
    this.secondDose = userData.is_second_doze_take;
    this.secondDoseDate = userData.second_doze_date;
    this.onRadioChange(this.firstDose);
    this.onChange(this.secondDose);
  }

  onRadioChange(value: any) {
    if (value == 'yes') this.isFirstDose = true;
    else {
      this.isFirstDose = false;
      this.isSecondDose = false;
      this.firstDoseDate = '';
      this.secondDose = 'no';
      this.secondDoseDate = '';
    }
  }

  onChange(value: any) {
    if (value == 'yes') this.isSecondDose = true;
    else {
      this.isSecondDose = false;
      this.secondDoseDate = '';
    }
  }

  onBackClick() {
    this.router.navigate(['employeeDetails']);
  }

  onSubmit(form: NgForm): void {
    form.value['username'] = this.id;
    if (this.secondDose == 'yes') {
      form.value['fullyVaccinated'] = 'yes';
    }
    form.value['firstDoseDate'] = moment(form.value['firstDoseDate']).format(
      'YYYY-MM-DD'
    );
    form.value['secondDoseDate'] = moment(form.value['secondDoseDate']).format(
      'YYYY-MM-DD'
    );
    this.api.postTypeRequest('user/empVaccineData', form.value).subscribe(
      (res: any) => {
        if (res.status) {
          alert('Data Update Successfully');
        } else {
          alert('Faliure in updating data');
        }
      },
      (err) => {
        alert(err['error'].message);
      }
    );
  }
}
