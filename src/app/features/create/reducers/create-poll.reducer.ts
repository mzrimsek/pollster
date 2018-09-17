import { tassign } from 'tassign';

import * as actions from '../actions/create-poll.actions';

import { SelectionMode } from '../../../shared/models';

export interface State {
  title: string;
  options: string[];
  selectionMode: SelectionMode;
  createdAt: number;
  createdBy: string;
}

const initialState: State = {
  title: '',
  options: [],
  selectionMode: 'SINGLE',
  createdAt: 0,
  createdBy: 'Anonymous'
};

export function reducer(state = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.SET_TITLE: {
      return tassign(state, { title: action.title });
    }
    case actions.SET_MODE: {
      return tassign(state, { selectionMode: action.mode });
    }
    case actions.ADD_OPTION: {
      const options = [...state.options, action.option];
      return tassign(state, { options });
    }
    case actions.CLEAR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
