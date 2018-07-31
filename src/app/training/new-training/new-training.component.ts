import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UiService } from '../../ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducers';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  loading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private uiService: UiService, private store: Store<fromTraining.TrainingState>) {
  }

  ngOnInit() {
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.loading$ = this.store.select(fromRoot.getLoading);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStart(id: string) {
    this.trainingService.startExercise(id);
  }

}
