import * as actions from './vote.actions';

import { VotePayload } from '../../../shared/models';

describe('Vote Actions', () => {
  describe('Vote', () => {
    const payload: VotePayload = {
      pollId: 'Some PollId',
      option: 'Some Option'
    };

    it('Should have correct type', () => {
      const action = new actions.Vote(payload);
      expect(action.type).toBe(actions.VOTE);
    });

    it('Should have correct payload', () => {
      const action = new actions.Vote(payload);
      expect(action.payload).toEqual({
        pollId: 'Some PollId',
        option: 'Some Option'
      });
    });
  });

  describe('Vote Succeeded', () => {
    it('Should have correct type', () => {
      const action = new actions.VoteSucceeded();
      expect(action.type).toBe(actions.VOTE_SUCCEEDED);
    });
  });
});
