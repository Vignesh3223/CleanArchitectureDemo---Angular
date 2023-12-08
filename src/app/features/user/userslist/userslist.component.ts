import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../auth/authmodel';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent implements OnInit {

  userdata: User[] = [];

  detail: User[] = [];

  hide: boolean = true;

  logged: boolean = false;

  EditForm: FormGroup | any;
  id: FormControl | any;
  username: FormControl | any;
  email: FormControl | any;
  password: FormControl | any;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (res) => {
        this.userdata = res;
      });

    this.id = new FormControl('');
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

    this.EditForm = new FormGroup({
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password
    });

  }

  viewDetails(id: number) {
    this.userService.getUserbyId(id).subscribe(
      (res) => {
        this.detail = Array.isArray(res) ? res : [res];
      });
  }

  getDetails(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password

    const userInfo = {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password
    }

    this.EditForm.patchValue({ ...userInfo });
  }

  EditUser(id: number) {
    if (this.EditForm.invalid) {
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
      this.userService.putuser(id, this.EditForm.value).subscribe();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: 'success',
        title: 'Updated Successfully',
        background: '#E6F9ED',
        color: '#006730'
      });
    }
  }

  deleteUser(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  logout() {
    localStorage.clear();
    this.authService.validateAuth(false);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: 'success',
      title: 'Signed out Successfully',
      background: '#E6F9ED',
      color: '#006730'
    });
    this.authService.authStatus.subscribe(
      (res) => {
        this.logged = res;
        this.router.navigate(['/']);
      });
  }
}
