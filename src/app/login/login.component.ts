import { AuthService } from '../service/auth.service';
import { LoginService } from '../service/login.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private api: LoginService,
    private auth: AuthService
  ) {}

  username: string | undefined;
  password: string | undefined;
  person: string | undefined;
  isLogin: boolean = false;
  errorMessage: any

  ngOnInit(): void {
    this.isUserLogin();
  }

  onSubmit(form: NgForm): void {
      this.api.postTypeRequest('user/login', form.value).subscribe(
        (res: any) => {
          if (res.status) {
            this.auth.setDataInLocalStorage(
              'userData',
              JSON.stringify(res.data)
            );
            this.auth.setDataInLocalStorage('token', res.token);
            if(res.data[0]?.isAdmin == "yes")
              this.router.navigate(['employeeDetails']);
            else
              this.router.navigate(['vaccineDetails']);
          } else {
            alert("Invalid Credentials");
          }
        },
        (err) => {
         alert(err['error'].message);
        }
      );
  }

  onCreateAccountClick() {
    this.router.navigate(['registration']);
  }

  isUserLogin() {
    if (this.auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
  logout() {
    this.auth.clearStorage();
    this.router.navigate(['']);
  }
}
