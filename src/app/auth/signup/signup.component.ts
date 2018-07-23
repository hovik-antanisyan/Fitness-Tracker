import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../ui.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  loading = false;
  private uiSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.uiSubscription = this.uiService.loadingStateChange
      .subscribe(isLoading => this.loading = isLoading);
  }

  onSignup(form: NgForm) {
    this.authService.register({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if (this.uiSubscription) {
      this.uiSubscription.unsubscribe();
    }
  }
}
