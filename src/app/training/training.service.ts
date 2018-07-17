import { Exercise } from './exercise.model';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {AngularFirestore} from 'angularfire2/firestore';
import {Injectable} from '@angular/core';

@Injectable()
export class TrainingService {
  private availableExercises$: Observable<Exercise[]>;
  exerciseStarted = new Subject<Exercise>();
  activeExercise: Exercise;
  exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvalableExercises() {
      this.availableExercises$ = this.db
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
          ));
  }

  startExercise(id: string) {
    this.activeExercise = this.availableExercises.find(ex => ex.id === id);
    this.exerciseStarted.next({...this.activeExercise});
  }

  getActiveExercise() {
    return this.activeExercise;
  }

  cancelExercise(progress: number) {
    this.exercises.push({
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
      this.exercises.push({
          ...this.activeExercise,
          date: new Date(),
          state: 'completed'
      });
      this.activeExercise = null;
      this.exerciseStarted.next(null);
  }

  getPastExercises() {
    return this.exercises.slice();
  }
}
