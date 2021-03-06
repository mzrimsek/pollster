import * as actions from '../actions/vote.actions';

import { reducer, State } from './vote.reducer';

describe('Vote Reducer', () => {
  it('Should set option when SetVoteOption is dispatched', () => {
    const initialState: State = {
      options: ['']
    };
    const newState = reducer(initialState, new actions.SetVoteOptions(['Chipotle']));
    expect(newState).toEqual({
      options: ['Chipotle']
    });
  });

  it('Should reset options when Clear is dispatched', () => {
    const initialState: State = {
      options: ['Option 1', 'Option 2']
    };
    const newState = reducer(initialState, new actions.Clear());
    expect(newState).toEqual({
      options: []
    });
  });
});
