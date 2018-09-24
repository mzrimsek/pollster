import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { ReplaySubject, throwError } from 'rxjs';

import { VoteEffects } from './vote.effects';

import { PollService } from '../../../shared/services/poll.service';
import { VoteService } from '../services/vote.service';

import * as appActions from '../../../actions/app.actions';
import * as voteInfoActions from '../actions/vote-info.actions';
import * as voteActions from '../actions/vote.actions';

import { poll, vote } from '../../../test-helpers';

describe('Vote Effects', () => {
  let actions: any;
  let effects: VoteEffects;
  let pollService: PollService;
  let voteService: VoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VoteEffects,
        provideMockActions(() => actions),
        { provide: PollService, useClass: poll.MockPollService },
        { provide: VoteService, useClass: vote.MockVoteService }
      ]
    });

    effects = TestBed.get(VoteEffects);
    pollService = TestBed.get(PollService);
    voteService = TestBed.get(VoteService);
  });

  describe('Vote', () => {
    const action = new voteActions.Vote(vote.testPayload);

    it('Should dispatch SendVoteSucceeded', () => {
      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new voteActions.VoteSucceeded(vote.testPayload)
      });

      expect(effects.vote$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(voteActions.VOTE, message)
      });
      spyOn(pollService, 'saveVote').and.callFake(() => throwError({ message }));
      expect(effects.vote$).toBeObservable(expected);
    });

    it('Should call PollService saveVote', () => {
      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(pollService, 'saveVote').and.callThrough();
      effects.vote$.subscribe(() => {
        expect(pollService.saveVote).toHaveBeenCalled();
      });
    });
  });

  describe('Vote Succeeded', () => {
    const action = new voteActions.VoteSucceeded(vote.testPayload);

    it('Should dispatch TrackVote', () => {
      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new voteInfoActions.TrackVote(vote.testPayload)
      });

      expect(effects.voteSucceeded$).toBeObservable(expected);
    });
  });

  describe('Track Vote', () => {
    const action = new voteInfoActions.TrackVote(vote.testPayload);

    it('Should dispatch TrackVoteSucceeded', () => {
      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new voteInfoActions.TrackVoteSucceeded(vote.testVoteInfo)
      });

      expect(effects.trackVote$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(voteInfoActions.TRACK_VOTE, message)
      });
      spyOn(voteService, 'trackVote').and.callFake(() => throwError({ message }));
      expect(effects.trackVote$).toBeObservable(expected);
    });

    it('Should call VoteSerice trackVote', () => {
      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(voteService, 'trackVote').and.callThrough();
      effects.trackVote$.subscribe(() => {
        expect(voteService.trackVote).toHaveBeenCalled();
      });
    });
  });

  describe('Load Vote Info', () => {
    const action = new voteInfoActions.LoadVoteInfo('uid');

    it('Should dispatch LoadVoteInfoSucceeded', () => {
      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new voteInfoActions.LoadVoteInfoSucceeded([vote.testVoteInfo])
      });

      expect(effects.loadVoteInfo$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(voteInfoActions.LOAD_VOTE_INFO, message)
      });
      spyOn(voteService, 'getVotesForUser').and.callFake(() => throwError({ message }));
      expect(effects.loadVoteInfo$).toBeObservable(expected);
    });

    it('Should call VoteSerice trackVote', () => {
      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(voteService, 'getVotesForUser').and.callThrough();
      effects.loadVoteInfo$.subscribe(() => {
        expect(voteService.getVotesForUser).toHaveBeenCalled();
      });
    });
  });
});
