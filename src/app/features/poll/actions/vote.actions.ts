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

export type All = Vote | VoteSucceeded;
