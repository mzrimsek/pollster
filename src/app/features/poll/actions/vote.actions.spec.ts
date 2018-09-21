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

  describe('Track Vote', () => {
    it('Should have correct type', () => {
      const action = new actions.TrackVote(vote.testPayload);
      expect(action.type).toBe(actions.TRACK_VOTE);
    });

    it('Should have correct payload', () => {
      const action = new actions.TrackVote(vote.testPayload);
      expect(action.payload).toEqual(vote.testPayload);
    });
  });

  describe('Track Vote Succeeded', () => {
    it('Should have correct type', () => {
      const action = new actions.TrackVoteSucceeded(vote.testVoteInfo);
      expect(action.type).toBe(actions.TRACK_VOTE_SUCCEEDED);
    });

    it('Should have correct payload', () => {
      const action = new actions.TrackVoteSucceeded(vote.testVoteInfo);
      expect(action.info).toEqual(vote.testVoteInfo);
    });
  });

  describe('Load Vote Info', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadVoteInfo('Some UserId');
      expect(action.type).toBe(actions.LOAD_VOTE_INFO);
    });

    it('Should have correct payload', () => {
      const action = new actions.LoadVoteInfo('Some UserId');
      expect(action.userId).toBe('Some UserId');
    });
  });

  describe('Load Vote Info Succeeded', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadVoteInfoSucceeded([vote.testVoteInfo]);
      expect(action.type).toBe(actions.LOAD_VOTE_INFO_SUCCEEDED);
    });

    it('Should have correct payload', () => {
      const action = new actions.LoadVoteInfoSucceeded([vote.testVoteInfo]);
      expect(action.info).toEqual([vote.testVoteInfo]);
    });
  });
});
