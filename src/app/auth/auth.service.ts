import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';

import { TrainingService } from '../training/training.service';
import { UiService } from '../ui.service';
import * as fromRoot from '../app.reducers';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>) {
  }

  initAuthListener() {
    this.afAuth.authState
      .subscribe((user) => {
        if (user) {
          this.store.dispatch(new Auth.SetAuthenticated());
          this.router.navigateByUrl('/training');
        } else {
          this.store.dispatch(new Auth.SetUnauthenticated());
          this.trainingService.cancelSubscriptions();
          this.router.navigateByUrl('login');
        }
      });
  }

  register(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
      .then((result: any) => {
        console.log(result);
          this.store.dispatch(new UI.StopLoading());
      })
      .catch((error: any) => {
          this.store.dispatch(new UI.StopLoading());
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
      this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then((result: any) => {
        console.log(result);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error: any) => {
        this.store.dispatch(new UI.StopLoading());
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

}
