import { Exercise } from './exercise.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { UiService } from '../ui.service';

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[];
  exercisesChanged = new Subject<Exercise[]>();
  exerciseStarted = new Subject<Exercise>();
  finishedExerciseStarted = new Subject<Exercise[]>();
  activeExercise: Exercise;
  afSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService) {
  }

  fetchAvailableExercises() {
    this.uiService.loadingStateChange.next(true);
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
          this.uiService.loadingStateChange.next(false);
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        },
        error => {
          this.uiService.loadingStateChange.next(false);
          this.exercisesChanged.next(null);
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
        this.finishedExerciseStarted.next(exercises);
      }));
  }

  startExercise(id: string) {
    this.activeExercise = this.availableExercises.find(ex => ex.id === id);
    this.exerciseStarted.next({...this.activeExercise});
  }

  getActiveExercise() {
    return this.activeExercise;
  }

  cancelExercise(progress: number) {
    this.addExerciseToDB({
      ...this.activeExercise,
      calories: this.activeExercise.calories * (progress / 100),
      duration: this.activeExercise.duration * (progress / 100),
      date: new Date(),
      state: 'canceled'
    });
    this.activeExercise = null;
    this.exerciseStarted.next(null);
  }

  completeExercise() {
    this.addExerciseToDB({
      ...this.activeExercise,
      date: new Date(),
      state: 'completed'
    });
    this.activeExercise = null;
    this.exerciseStarted.next(null);
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
