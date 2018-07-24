import * as UI from './ui.actions';

export interface State {
  loading: boolean;
}

const initialState: State = {
  loading: false
};

export function uiReducer(state = initialState, action: UI.Actions) {
  switch (action.type) {
    case UI.START_LOADING:
      return {
        ...state,
        loading: true
      };
    case UI.STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export const getLoading = (state: State) => state.loading;
