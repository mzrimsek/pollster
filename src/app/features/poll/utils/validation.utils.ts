import { Dictionary } from '@ngrx/entity';

import { Poll } from '../../../shared/models';
import { VoteInfo } from '../models';

export const canVote = (voteInfo: Dictionary<VoteInfo>, pollId: string): boolean => {
  return !voteInfo[pollId];
};

export const isInvalid = (poll: Poll, time: number): boolean => {
  return poll.validUntil !== null && time >= poll.validUntil;
};
