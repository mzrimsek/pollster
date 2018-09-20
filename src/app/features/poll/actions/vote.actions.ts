import { Action } from '@ngrx/store';

import { VotePayload } from '../../../shared/models';
import { VoteInfo } from '../models';

export const VOTE = '[Vote] Vote';
export class Vote implements Action {
  readonly type = VOTE;
  constructor(public payload: VotePayload) { }
}

export const TRACK_VOTE = '[Vote] Track Vote';
export class TrackVote implements Action {
  readonly type = TRACK_VOTE;
  constructor(public payload: VotePayload) { }
}

export const TRACK_VOTE_SUCCEEDED = '[Vote] Track Vote Succeeded';
export class TrackVoteSucceeded implements Action {
  readonly type = TRACK_VOTE_SUCCEEDED;
  constructor(public info: VoteInfo) { }
}

export const LOAD_VOTE_INFO = '[Vote] Load Vote Info';
export class LoadVoteInfo implements Action {
  readonly type = LOAD_VOTE_INFO;
  constructor(public userId: string) { }
}

export const LOAD_VOTE_INFO_SUCCEEDED = '[Vote] Load Vote Info Succeeded';
export class LoadVoteInfoSucceeded implements Action {
  readonly type = LOAD_VOTE_INFO_SUCCEEDED;
  constructor(public info: VoteInfo[]) { }
}

export type All = Vote |
  TrackVote |
  TrackVoteSucceeded |
  LoadVoteInfo |
  LoadVoteInfoSucceeded;
