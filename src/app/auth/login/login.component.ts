import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../authmodel';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  hide:boolean = true;

  loginimage = "/assets/images/login.avif"

  logo = "/assets/images/CGVAK Logo.svg"

  LoginForm: FormGroup | any;
  username: FormControl | any;
  password: FormControl | any;

  submitted = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[A-Za-z ]*')
      ]);
    this.password = new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)
      ]);

    this.LoginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onLogin(user: User) {
    if (this.LoginForm.invalid) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: 'error',
        title: 'Fill in all the details',
        background: '#FCEBE9',
        color: '#751A0C'
      });
    }
    else {
      this.authService.validateUser(user);
    }
  }

}
