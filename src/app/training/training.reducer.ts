import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Exercise } from './exercise.model';
import * as training from './training.actions';
import * as fromRoot from './../app.reducers';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  runningExercise: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  runningExercise: null
};

export function trainingReducer(state = initialState, action: training.TrainingActions) {
  switch (action.type) {
    case training.FETCH_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      };
    case training.FETCH_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case training.START_TRAINING:
      const running_training = state.availableExercises.find(ex => ex.id === action.payload);
      return {
        ...state,
        runningExercise: {...running_training}
      };
    case training.STOP_TRAINING:
      return {
        ...state,
        runningExercise: null
      };
    default:
      return state;
  }
}

const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedeExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getRunningExercise = createSelector(getTrainingState, (state: TrainingState) => state.runningExercise);
export const getIsRunningExercise = createSelector(getTrainingState, (state: TrainingState) => state ? state.runningExercise != null : false);
