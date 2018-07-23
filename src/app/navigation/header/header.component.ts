import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authChangeSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authChangeSubscription = this.authService.authChanged.subscribe(isAuth => this.isAuth = isAuth);
  }

  onSidenavToggle() {
    this.sidenavToggle.emit();
  }

  onLogout(e) {
    e.preventDefault();
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authChangeSubscription) {
      this.authChangeSubscription.unsubscribe();
    }
  }

}
