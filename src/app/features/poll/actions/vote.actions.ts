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
  constructor(public payload: VotePayload) { }
}

export const SET_VOTE_OPTION = '[Vote] Set Vote Option';
export class SetVoteOption implements Action {
  readonly type = SET_VOTE_OPTION;
  constructor(public option: string) { }
}

export type All = Vote |
  VoteSucceeded |
  SetVoteOption;
