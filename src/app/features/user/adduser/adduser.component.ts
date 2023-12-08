import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../auth/authmodel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent implements OnInit {

  hide: boolean = true;

  CreateForm: FormGroup | any;
  id: FormControl | any;
  username: FormControl | any;
  email: FormControl | any;
  password: FormControl | any

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.id = new FormControl('')
    this.username = new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[A-Za-z ]*')
      ]);
    this.email = new FormControl('',
      [
        Validators.required,
        Validators.email
      ]);
    this.password = new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)
      ]);

    this.CreateForm = new FormGroup({
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }

  PostUser(CreateForm: User) {
    if (this.CreateForm.invalid) {
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
      this.userService.postuser(CreateForm).subscribe();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: 'success',
        title: 'User added Successfully',
        background: '#E6F9ED',
        color: '#006730'
      });
      setTimeout(() => { this.router.navigate(['/users']) }, 1000);
    }
  }
}
