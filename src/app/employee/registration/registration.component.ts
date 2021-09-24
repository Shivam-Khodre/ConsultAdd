import { NgForm } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private api: LoginService,
    private auth: AuthService,
    private router: Router
  ) {}
  username: string | undefined;
  password: string | undefined;
  age: number | undefined;
  gender: string | undefined;
  cinfo: number | undefined;
  name: string | undefined;
  email: string | undefined;
  genderList = [
    { value: 'M', viewValue: 'Male' },
    { value: 'F', viewValue: 'Female' },
    { value: 'Other', viewValue: 'Others' },
  ];

  isLogin: boolean = false;
  errorMessage: any;
  ngOnInit(): void {
    this.isUserLogin();
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.api.postTypeRequest('user/register', form.value).subscribe(
        (res: any) => {
          if (res.status) {
            this.router.navigate(['login']);
          } else {
            alert(res.msg);
          }
        },
        (err) => {
          this.errorMessage = err['error'].message;
        }
      );
    }
  }
  isUserLogin() {
    if (this.auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
}
