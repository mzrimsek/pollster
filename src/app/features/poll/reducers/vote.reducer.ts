import * as actions from '../actions/vote.actions';

export interface State {
  option: string;
}

const initialState: State = {
  option: ''
};

export function reducer(state = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_VOTE_OPTION: {
      return {
        ...state,
        option: action.option
      };
    }
    default: {
      return state;
    }
  }
}
