import * as actions from '../actions/vote.actions';

import { reducer, State } from './vote.reducer';

describe('Vote Reducer', () => {
  it('Should set voteSucceeded to true when SendVoteSucceeded is dispatched', () => {
    const initialState: State = {
      voteSucceeded: false
    };
    const newState = reducer(initialState, new actions.VoteSucceeded());
    expect(newState).toEqual({
      voteSucceeded: true
    });
  });
});
