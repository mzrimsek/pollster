import { Action } from '@ngrx/store';

import { VotePayload } from '../../../shared/models';

export const VOTE = '[Vote] Vote';
export class Vote implements Action {
  readonly type = VOTE;
  constructor(public payload: VotePayload) { }
}

export const VOTE_SUCCEEDED = '[Vote] Vote Succeeded';
export class VoteSucceeded implements Action {
  readonly type = VOTE_SUCCEEDED;
  constructor() { }
}

export const TRACK_VOTE = '[Vote] Track Vote';
export class TrackVote implements Action {
  readonly type = TRACK_VOTE;
  constructor(public payload: VotePayload) { }
}

export const TRACK_VOTE_SUCCEEDED = '[Vote] Track Vote Succeeded';
export class TrackVoteSucceeded implements Action {
  readonly type = TRACK_VOTE_SUCCEEDED;
  constructor() { }
}

export type All = Vote |
  VoteSucceeded |
  TrackVote |
  TrackVoteSucceeded;
