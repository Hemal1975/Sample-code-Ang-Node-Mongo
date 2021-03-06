import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.modal';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  createUser(email: string, password: string){
    const authData: AuthData = {email: email, password: password};
    this.http.post("http://localhost:3000/api/user/signup", authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  login(email: string, password: string){
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token}>("http://localhost:3000/api/user/login", authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
      }
    });
  }

}
