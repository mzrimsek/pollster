import * as actions from '../actions/create-poll.actions';

import { reducer, State } from './create-poll.reducer';

import { SelectionMode } from '../../../shared/models';

describe('Create Poll Reducer', () => {
  it('Should set title when SetTitle is dispatched', () => {
    const title = 'Some Title';
    const newState = reducer(initialState, new actions.SetTitle(title));
    expect(newState).toEqual({
      ...initialState,
      title
    });
  });

  it('Should set selectionMode when SetMode is dispatched', () => {
    const selectionMode: SelectionMode = 'SINGLE';
    const newState = reducer(initialState, new actions.SetMode(selectionMode));
    expect(newState).toEqual({
      ...initialState,
      selectionMode
    });
  });

  it('Should set validUntil when SetValidUntil is dispatched', () => {
    const validUntil = 100000;
    const newState = reducer(initialState, new actions.SetValidUntil(validUntil));
    expect(newState).toEqual({
      ...initialState,
      validUntil
    });
  });

  it('Should add an option when AddOption is dispatched', () => {
    const option = 'Some Option';
    const newState = reducer(initialState, new actions.AddOption(1, option));
    expect(newState).toEqual({
      ...initialState,
      ids: [1],
      entities: {
        1: {
          id: 1,
          value: option
        }
      }
    });
  });

  it('Should remove an option when RemoveOption is dispatched', () => {
    const currentState: State = {
      ...initialState,
      ids: [1],
      entities: {
        1: {
          id: 1,
          value: 'Some Option'
        }
      }
    };
    const newState = reducer(currentState, new actions.RemoveOption(1));
    expect(newState).toEqual({
      ...currentState,
      ids: [],
      entities: {}
    });
  });

  it('Should reset to initialState when Clear is dispatched', () => {
    const currentState: State = {
      title: 'Some Title',
      selectionMode: 'MULTI',
      validUntil: 1000000,
      ids: [1],
      entities: {
        1: {
          id: 1,
          value: 'Some Option'
        }
      }
    };
    const newState = reducer(currentState, new actions.Clear());
    expect(newState).toEqual(initialState);
  });
});

const initialState: State = {
  ids: [],
  entities: {},
  title: '',
  selectionMode: 'SINGLE',
  validUntil: null
};
