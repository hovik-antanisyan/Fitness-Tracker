import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const FETCH_AVAILABLE_EXERCISES = '[Training] Fetch Available Exercises';
export const FETCH_FINISHED_EXERCISES = '[Training] Fetch Finished Exercises';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

export class FetchAvailableExercises implements Action {
  readonly type = FETCH_AVAILABLE_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class FetchFinishedExercises implements Action {
  readonly type = FETCH_FINISHED_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions =
  FetchAvailableExercises |
  FetchFinishedExercises |
  StartTraining |
  StopTraining;
