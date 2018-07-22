import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UiService {
  loadingStateChange = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {}

  showSnackBar(message, action, options) {
    this.snackbar.open(message, action, options);
  }
}
