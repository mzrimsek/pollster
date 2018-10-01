import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCreatePoll from './create-poll.reducer';

import { CreatePollInfo } from '../models';

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

export const { selectAll: _selectOptions } = fromCreatePoll.adapter.getSelectors(_selectCreatePoll);
export const _selectCreatePollInfo = createSelector(_selectCreatePoll, _selectOptions, (createPoll, options) => {
  return <CreatePollInfo>{
    title: createPoll.title,
    selectionMode: createPoll.selectionMode,
    validUntil: createPoll.validUntil,
    options
  };
});
export const _selectPollHasEnd = createSelector(_selectCreatePoll, createPoll => createPoll.hasEnd);

const createSelectors = {
  createPollInfo: _selectCreatePollInfo,
  pollHasEnd: _selectPollHasEnd
};

export default createSelectors;
