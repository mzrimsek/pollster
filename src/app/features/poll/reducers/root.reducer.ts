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

export const { selectEntities: _selectVoteInfo } = fromVote.adapter.getSelectors(_selectVote);


const pollSelectors = {
  voteInfo: _selectVoteInfo
};

export default pollSelectors;
