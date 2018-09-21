import * as actions from '../actions/vote.actions';

import { reducer, State } from './vote.reducer';

import { vote } from '../../../test-helpers';

describe('Vote Reducer', () => {
  it('Should set add an item when TrackVoteSucceeded is dispatched', () => {
    const initialState: State = {
      ids: [],
      entities: {}
    };
    const newState = reducer(initialState, new actions.TrackVoteSucceeded(vote.testVoteInfo));
    expect(newState).toEqual({
      ids: [vote.testVoteInfo.pollId],
      entities: {
        [vote.testVoteInfo.pollId]: {
          ...vote.testVoteInfo
        }
      }
    });
  });

  it('Should add all items when LoadVoteInfoSucceeded is dispatched', () => {
    const initialState: State = {
      ids: [],
      entities: {}
    };
    const newState = reducer(initialState, new actions.LoadVoteInfoSucceeded([vote.testVoteInfo]));
    expect(newState).toEqual({
      ids: [vote.testVoteInfo.pollId],
      entities: {
        [vote.testVoteInfo.pollId]: {
          ...vote.testVoteInfo
        }
      }
    });
  });
});
