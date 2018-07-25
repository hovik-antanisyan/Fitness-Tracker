import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { State } from '../../auth/auth.reducer';
import { getIsAuth } from '../../app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(getIsAuth);
  }

  onSidenavToggle() {
    this.sidenavToggle.emit();
  }

  onLogout(e) {
    e.preventDefault();
    this.authService.logout();
  }

}
