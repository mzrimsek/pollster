import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromVote from './vote.reducer';

import { VoteInfo } from '../models';

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

export const _selectHasVoted = createSelector(_selectVote, vote => vote.option !== '' && vote.votedOn !== 0);
export const _selectVoteInfo = createSelector(_selectVote, vote => vote as VoteInfo);

const pollSelectors = {
  hasVoted: _selectHasVoted,
  voteInfo: _selectVoteInfo
};

export default pollSelectors;
