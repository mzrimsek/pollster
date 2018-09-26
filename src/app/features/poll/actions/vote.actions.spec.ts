import * as actions from './vote.actions';

import { vote } from '../../../test-helpers';

describe('Vote Actions', () => {
  describe('Vote', () => {
    it('Should have correct type', () => {
      const action = new actions.Vote(vote.testPayload);
      expect(action.type).toBe(actions.VOTE);
    });

    it('Should have correct payload', () => {
      const action = new actions.Vote(vote.testPayload);
      expect(action.payload).toEqual(vote.testPayload);
    });
  });

  describe('Vote Succeeded', () => {
    it('Should have correct type', () => {
      const action = new actions.VoteSucceeded(vote.testPayload);
      expect(action.type).toBe(actions.VOTE_SUCCEEDED);
    });

    it('Should have correct payload', () => {
      const action = new actions.VoteSucceeded(vote.testPayload);
      expect(action.payload).toEqual(vote.testPayload);
    });
  });

  describe('Set Vote Option', () => {
    it('Should have correct type', () => {
      const action = new actions.SetVoteOptions(['']);
      expect(action.type).toBe(actions.SET_VOTE_OPTIONS);
    });

    it('Should have correct option', () => {
      const action = new actions.SetVoteOptions(['Option']);
      expect(action.options).toEqual(['Option']);
    });
  });
});
