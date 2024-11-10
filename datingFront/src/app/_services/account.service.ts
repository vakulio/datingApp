import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { IUser } from '../_models/user';
import { map } from 'rxjs';
import { ILogin } from '../_models/login';
@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private http = inject(HttpClient);
  readonly baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<IUser | null>(null);

  login(model: ILogin) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  register(model: ILogin) {
    return this.http.post<IUser>(this.baseUrl + 'account/register', model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
