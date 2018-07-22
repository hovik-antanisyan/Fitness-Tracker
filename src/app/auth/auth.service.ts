import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../ui.service';

@Injectable()
export class AuthService {
  authChanged = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService) {
  }

  initAuthListener() {
    this.afAuth.authState
      .subscribe((user) => {
        if (user) {
          this.isAuthenticated = true;
          this.authChanged.next(true);
          this.router.navigateByUrl('/training');
        } else {
          this.isAuthenticated = false;
          this.trainingService.cancelSubscriptions();
          this.authChanged.next(false);
          this.router.navigateByUrl('login');
        }
      });
  }

  register(authData: AuthData) {
    this.uiService.loadingStateChange.next(true);
    this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
      .then((result: any) => {
        console.log(result);
        this.uiService.loadingStateChange.next(false);
      })
      .catch((error: any) => {
        this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackBar(
          error.message, null,
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'error'
          });
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChange.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then((result: any) => {
        console.log(result);
        this.uiService.loadingStateChange.next(false);
      })
      .catch((error: any) => {
        this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackBar(
          error.message, null,
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'error'
          });
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
