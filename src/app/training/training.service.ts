import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  exerciseStarted = new Subject<Exercise>();
  activeExercise: Exercise;
  exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
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
