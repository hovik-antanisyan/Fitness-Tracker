import { Exercise } from './exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/internal/operators';
import { UiService } from '../ui.service';
import * as fromTraining from './training.reducer';
import * as training from './training.actions';
import * as UI from './../shared/ui.actions';

@Injectable()
export class TrainingService {
  afSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromTraining.TrainingState>) {
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.afSubscriptions.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(map(
        (result: any) => {
          return result.map((item) => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            };
          });
        }
      ))
      .subscribe(
        (exercises: Exercise[]) => {
          this.store.dispatch(new training.FetchAvailableExercises(exercises));
          this.store.dispatch(new UI.StopLoading());
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackBar('Failed fetching exercises, try again.', null, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'error'
          });
        }));
  }

  fetchFinishedExercises() {
    this.afSubscriptions.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new training.FetchFinishedExercises(exercises));
      }));
  }

  startExercise(id: string) {
    this.store.dispatch(new training.StartTraining(id));
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getRunningExercise)
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        this.addExerciseToDB({
          ...exercise,
          calories: exercise.calories * (progress / 100),
          duration: exercise.duration * (progress / 100),
          date: new Date(),
          state: 'canceled'
        });
        this.store.dispatch(new training.StopTraining());
      });
  }

  completeExercise() {
    this.store.select(fromTraining.getRunningExercise)
      .subscribe((exercise: Exercise) => {
        this.addExerciseToDB({
          ...exercise,
          date: new Date(),
          state: 'canceled'
        });
        this.store.dispatch(new training.StopTraining());
      });
  }

  private addExerciseToDB(exercise: Exercise) {
    this.db.collection('finishedExercises')
      .add(exercise);
  }

  cancelSubscriptions() {
    for (const sub of this.afSubscriptions) {
      sub.unsubscribe();
    }
  }
}
