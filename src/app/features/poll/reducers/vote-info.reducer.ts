import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as actions from '../actions/vote-info.actions';

export interface VoteInfoEntity {
  pollId: string;
  option: string;
  votedOn: number;
}

export interface State extends EntityState<VoteInfoEntity> { }
export const adapter: EntityAdapter<VoteInfoEntity> = createEntityAdapter<VoteInfoEntity>({
  selectId: (entity) => entity.pollId
});
const inititalState = adapter.getInitialState();

export function reducer(state = inititalState, action: actions.All): State {
  switch (action.type) {
    case actions.TRACK_VOTE_SUCCEEDED: {
      return adapter.addOne(action.info, state);
    }
    case actions.LOAD_VOTE_INFO_SUCCEEDED: {
      return adapter.addAll(action.info, state);
    }
    default: {
      return state;
    }
  }
}
