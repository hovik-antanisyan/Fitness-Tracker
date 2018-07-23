import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UiService } from '../../ui.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: any;
  selectedExercise = null;
  loading = false;
  private uiSubscription: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UiService) {
  }

  ngOnInit() {
    this.trainingService.exercisesChanged
      .subscribe(
        (exercises: Exercise[]) => {
          this.exercises = exercises;
        }
      );
    this.uiSubscription = this.uiService.loadingStateChange
      .subscribe(isLoading => this.loading = isLoading);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStart(id: string) {
    this.trainingService.startExercise(id);
  }

  ngOnDestroy() {
    if (this.uiSubscription) {
      this.uiSubscription.unsubscribe();
    }
  }

}
