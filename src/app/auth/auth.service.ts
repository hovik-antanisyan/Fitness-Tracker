import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChanged = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  register(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChanged.next(false);
    this.router.navigateByUrl('login');
  }

  getUser(): User {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  authSuccessfully() {
    this.authChanged.next(true);
    this.router.navigateByUrl('/training');
  }
}
