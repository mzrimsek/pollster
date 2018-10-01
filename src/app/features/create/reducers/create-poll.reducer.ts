import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as actions from '../actions/create-poll.actions';

export interface OptionEntity {
  id: number;
  value: string;
}

export interface State extends EntityState<OptionEntity> {
  title: string;
  selectionMode: string;
  validUntil: number | null;
  hasEnd: boolean;
}

export const adapter: EntityAdapter<OptionEntity> = createEntityAdapter<OptionEntity>();
const initialState: State = adapter.getInitialState({
  title: '',
  selectionMode: 'SINGLE',
  validUntil: null,
  hasEnd: false
});

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
      return adapter.addOne({
        id: action.id,
        value: action.option
      }, state);
    }
    case actions.REMOVE_OPTION: {
      return adapter.removeOne(action.optionId, state);
    }
    case actions.CLEAR: {
      return initialState;
    }
    case actions.SET_HAS_END: {
      return {
        ...state,
        hasEnd: action.hasEnd
      };
    }
    default: {
      return state;
    }
  }
}
