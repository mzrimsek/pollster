import * as actions from '../actions/vote.actions';

export interface State {
  options: string[];
}

const initialState: State = {
  options: []
};

export function reducer(state = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_VOTE_OPTIONS: {
      return {
        ...state,
        options: action.options
      };
    }
    default: {
      return state;
    }
  }
}
