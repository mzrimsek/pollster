import * as actions from '../actions/create-poll.actions';

import { SelectionMode } from '../../../shared/models';

export interface State {
  title: string;
  options: string[];
  selectionMode: SelectionMode;
  validUntil: number | null;
}

const initialState: State = {
  title: '',
  options: [],
  selectionMode: 'SINGLE',
  validUntil: null
};

export function reducer(state = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_TITLE: {
      return {
        ...state,
        title: action.title
      };
    }
    case actions.SET_MODE: {
      return {
        ...state,
        selectionMode: action.mode
      };
    }
    case actions.SET_VALID_UNTIL: {
      return {
        ...state,
        validUntil: action.time
      };
    }
    case actions.ADD_OPTION: {
      const options = [...state.options, action.option];
      return {
        ...state,
        options
      };
    }
    case actions.CLEAR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
