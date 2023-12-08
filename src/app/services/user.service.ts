import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../auth/authmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userurl = environment.userapi;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userurl + '/' + 'GetUsers');
  }

  getUserbyId(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userurl + '/' + 'GetUserById?id=' + id);
  }

  postuser(newUser: User) {
    return this.httpClient.post<User[]>(this.userurl + '/' + 'Register', newUser);
  }

  putuser(id: number, editedUser: User) {
    return this.httpClient.put<User>(this.userurl + '/' + 'UpdateUser?id=' + id, editedUser);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(this.userurl + '/' + 'DeleteUser?id=' + id);
  }
}
