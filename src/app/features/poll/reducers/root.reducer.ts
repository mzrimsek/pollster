import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromVoteInfo from './vote-info.reducer';
import * as fromVote from './vote.reducer';

export interface PollState {
  voteInfo: fromVoteInfo.State;
  vote: fromVote.State;
}

export interface State {
  poll: PollState;
}

export const reducers: ActionReducerMap<PollState, any> = {
  voteInfo: fromVoteInfo.reducer,
  vote: fromVote.reducer
};

export const _selectPollState = createFeatureSelector<PollState>('poll');
export const _selectVoteInfo = createSelector(_selectPollState, state => state.voteInfo);
export const _selectVote = createSelector(_selectPollState, state => state.vote);

export const { selectEntities: _selectVoteInfoEntities } = fromVoteInfo.adapter.getSelectors(_selectVoteInfo);

export const _selectVoteOption = createSelector(_selectVote, vote => vote.option);

const pollSelectors = {
  voteInfo: _selectVoteInfoEntities,
  selectedOption: _selectVoteOption
};

export default pollSelectors;
