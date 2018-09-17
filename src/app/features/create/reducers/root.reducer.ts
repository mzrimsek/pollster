import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCreatePoll from './create-poll.reducer';

export interface CreateState {
  createPoll: fromCreatePoll.State;
}

export interface State {
  create: CreateState;
}

export const reducers: ActionReducerMap<CreateState, any> = {
  createPoll: fromCreatePoll.reducer
};

export const _selectCreateState = createFeatureSelector<CreateState>('create');
export const _selectCreatePoll = createSelector(_selectCreateState, state => state.createPoll);

export const _selectOptions = createSelector(_selectCreatePoll, createPoll => createPoll.options);

const createSelectors = {
  options: _selectOptions
};

export default createSelectors;
