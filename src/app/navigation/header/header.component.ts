import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth= false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authChanged.subscribe(isAuth => this.isAuth = isAuth);
  }

  onSidenavToggle() {
    this.sidenavToggle.emit();
  }

  onLogout(e) {
    e.preventDefault();
    this.authService.logout();
  }

}
