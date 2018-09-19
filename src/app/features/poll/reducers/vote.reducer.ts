import * as actions from '../actions/vote.actions';

export interface State {
  voteSucceeded: boolean;
}

const inititalState: State = {
  voteSucceeded: false
};

export function reducer(state = inititalState, action: actions.All): State {
  switch (action.type) {
    case actions.VOTE_SUCCEEDED: {
      return {
        ...state,
        voteSucceeded: true
      };
    }
    default: {
      return state;
    }
  }
}
