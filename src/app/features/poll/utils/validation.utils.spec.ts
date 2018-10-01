import { Dictionary } from '@ngrx/entity';

import { Poll } from '../../../shared/models';
import { VoteInfo } from '../models';

import { canVote, isInvalid } from './validation.utils';

import { poll } from '../../../test-helpers';

describe('Validation Utils', () => {
  describe('canVote', () => {
    it('Should return true when voteInfo does not contain pollId', () => {
      const result = canVote({}, 'pollId');
      expect(result).toBe(true);
    });

    it('Should return false when voteInfo contains pollId', () => {
      const voteInfo: Dictionary<VoteInfo> = {
        ['pollId']: {
          pollId: 'pollId',
          options: ['Option'],
          votedOn: 10000
        }
      };
      const result = canVote(voteInfo, 'pollId');
      expect(result).toBe(false);
    });
  });

  describe('isInvalid', () => {
    it('Should return false when validUntil is null', () => {
      const result = isInvalid(poll.testPoll, 0);
      expect(result).toBe(false);
    });

    it('Should return false when time is less than validUntil', () => {
      const newPoll: Poll = {
        ...poll.testPoll,
        validUntil: 10000
      };
      const result = isInvalid(newPoll, 0);
      expect(result).toBe(false);
    });

    it('Should return true when time is equal to validUntil', () => {
      const newPoll: Poll = {
        ...poll.testPoll,
        validUntil: 10000
      };
      const result = isInvalid(newPoll, 10000);
      expect(result).toBe(true);
    });

    it('Should return true when time is greater than validUntil', () => {
      const newPoll: Poll = {
        ...poll.testPoll,
        validUntil: 10000
      };
      const result = isInvalid(newPoll, 20000);
      expect(result).toBe(true);
    });
  });
});
