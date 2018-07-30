import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import * as fromTraining from './training.reducer';
import * as training from './training.actions';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsRunningExercise);
  }

}
