import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  getUserDetails() {
    return localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData') || '{}')
      : null;
  }
  setDataInLocalStorage(variableName: string, data: string) {
    localStorage.setItem(variableName, data);
    this.loggedIn.next(true);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  clearStorage() {
    localStorage.clear();
  }
  logout(){
    this.clearStorage();
    this.loggedIn.next(false);
  }
}
