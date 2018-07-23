import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output()sidenavClose = new EventEmitter<void>();
  isAuth = false;
  authChangeSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authChanged.subscribe(isAuth => this.isAuth = isAuth);
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  onLogout(e) {
    e.preventDefault();
    this.onSidenavClose();
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authChangeSubscription) {
      this.authChangeSubscription.unsubscribe();
    }
  }

}
