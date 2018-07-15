import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output()sidenavClose = new EventEmitter<void>();
  isAuth = false;

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

}
