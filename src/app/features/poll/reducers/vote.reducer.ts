import * as actions from '../actions/vote.actions';

export interface State {
  option: string;
  votedOn: number;
}

const inititalState: State = {
  option: '',
  votedOn: 0
};

export function reducer(state = inititalState, action: actions.All): State {
  switch (action.type) {
    case actions.TRACK_VOTE_SUCCEEDED: {
      return {
        ...state,
        ...action.info
      };
    }
    case actions.LOAD_VOTE_INFO_SUCCEEDED: {
      return {
        ...state,
        ...action.info
      };
    }
    default: {
      return state;
    }
  }
}
