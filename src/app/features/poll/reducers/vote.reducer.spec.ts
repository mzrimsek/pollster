import * as actions from '../actions/vote.actions';

import { reducer, State } from './vote.reducer';

describe('Vote Reducer', () => {
  it('Should set option when SetVoteOption is dispatched', () => {
    const initialState: State = {
      option: ''
    };
    const newState = reducer(initialState, new actions.SetVoteOption('Chipotle'));
    expect(newState).toEqual({
      option: 'Chipotle'
    });
  });
});
