import { Action } from '@ngrx/store';

import { VotePayload } from '../../../shared/models';

export const SEND_VOTE = '[Vote] Send Vote';
export class SendVote implements Action {
  readonly type = SEND_VOTE;
  constructor(public payload: VotePayload) { }
}

export const SEND_VOTE_SUCCEEDED = '[Vote] Send Vote Succeeded';
export class SendVoteSucceeded implements Action {
  readonly type = SEND_VOTE_SUCCEEDED;
  constructor() { }
}

export type All = SendVote | SendVoteSucceeded;
