import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, Response } from './authmodel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userPayload: any;
  loginurl = environment.loginapi;
  userurl = environment.userapi;

  constructor(private httpclient: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken()
  }

  setToken(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  getToken(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        return true;
      }
    }
    return false
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')!;
      return jwtHelper.decodeToken(token);
    }
  }

  public authSubject = new BehaviorSubject<boolean>(this.getToken());
  authStatus = this.authSubject.asObservable();
  validateAuth(state: boolean) {
    this.authSubject.next(state);
  }

  public static isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false
  }

  validateUser(user: User): void {
    this.httpclient.post<Response>(this.loginurl + '/Login', user).subscribe(
      {
        next: (res => {
          this.setToken(res.token, user.username);
          this.validateAuth(true);
          const tokenPayload = this.decodeToken();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: 'success',
            title: 'Logged In Successfully',
            background: '#E6F9ED',
            color: '#006730'
          });
          setTimeout(() => { this.router.navigate(['/users']) }, 1000);
        }),
        error: (err => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: 'error',
            title: 'Login Failed! User not found',
            background: '#FCEBE9',
            color: '#751A0C'
          });
        })
      });
  }
}
