import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromVote from './vote.reducer';

export interface PollState {
  vote: fromVote.State;
}

export interface State {
  poll: PollState;
}

export const reducers: ActionReducerMap<PollState, any> = {
  vote: fromVote.reducer
};

export const _selectPollState = createFeatureSelector<PollState>('poll');
export const _selectVote = createSelector(_selectPollState, state => state.vote);

export const _selectVoteSucceeded = createSelector(_selectVote, vote => vote.voteSucceeded);

const pollSelectors = {
  voteSucceeded: _selectVoteSucceeded
};

export default pollSelectors;
