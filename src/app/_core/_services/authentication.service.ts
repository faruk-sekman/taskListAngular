import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { UserModel } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<UserModel>;
  public user: Observable<UserModel>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<UserModel>(JSON.parse(<string>localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserModel {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiAuthUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    // @ts-ignore
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
