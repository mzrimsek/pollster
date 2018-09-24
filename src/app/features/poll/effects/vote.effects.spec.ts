import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { ReplaySubject, throwError } from 'rxjs';

import { VoteEffects } from './vote.effects';

import { PollService } from '../../../shared/services/poll.service';

import * as appActions from '../../../actions/app.actions';
import * as voteInfoActions from '../actions/vote-info.actions';
import * as voteActions from '../actions/vote.actions';

import { poll, vote } from '../../../test-helpers';

describe('Vote Effects', () => {
  let actions: any;
  let effects: VoteEffects;
  let pollService: PollService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VoteEffects,
        provideMockActions(() => actions),
        { provide: PollService, useClass: poll.MockPollService },
      ]
    });

    effects = TestBed.get(VoteEffects);
    pollService = TestBed.get(PollService);
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


});
