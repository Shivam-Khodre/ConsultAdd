import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Vaccination';
  isLoggedIn: Observable<boolean> | undefined;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn; // {2}
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
