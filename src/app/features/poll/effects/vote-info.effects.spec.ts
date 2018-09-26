import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { ReplaySubject, throwError } from 'rxjs';

import { VoteInfoEffects } from './vote-info.effects';

import { VoteService } from '../services/vote.service';

import * as appActions from '../../../actions/app.actions';
import * as voteInfoActions from '../actions/vote-info.actions';

import { vote } from '../../../test-helpers';

describe('Vote Info Effects', () => {
  let actions: any;
  let effects: VoteInfoEffects;
  let voteService: VoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VoteInfoEffects,
        provideMockActions(() => actions),
        { provide: VoteService, useClass: vote.MockVoteService },
      ]
    });

    effects = TestBed.get(VoteInfoEffects);
    voteService = TestBed.get(VoteService);
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
