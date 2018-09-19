import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { ReplaySubject, throwError } from 'rxjs';

import { CreatePollEffects } from './create-poll.effects';

import { PollService } from '../../../shared/services/poll.service';

import * as appActions from '../../../actions/app.actions';
import * as createPollActions from '../actions/create-poll.actions';

import { MockPollService } from '../../../test-helpers/mocks';

describe('Create Poll Effects', () => {
  let actions: any;
  let effects: CreatePollEffects;
  let pollService: PollService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreatePollEffects,
        provideMockActions(() => actions),
        { provide: PollService, useClass: MockPollService },
        { provide: Router, useValue: router }
      ]
    });

    effects = TestBed.get(CreatePollEffects);
    pollService = TestBed.get(PollService);
  });

  describe('Save', () => {
    const action = new createPollActions.Save({
      title: 'Some Title',
      selectionMode: 'SINGLE',
      validUntil: null,
      options: {
        'Option 1': 0,
        'Option 2': 0
      },
      createdAt: 10000,
      createdBy: 'Anonymous'
    });

    it('Should dispatch Clear', () => {
      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new createPollActions.Clear()
      });

      expect(effects.save$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new appActions.Error(createPollActions.SAVE, message)
      });

      spyOn(pollService, 'savePoll').and.callFake(() => throwError({ message }));
      expect(effects.save$).toBeObservable(expected);
    });

    it('Should call PollService savePoll', () => {
      actions = new ReplaySubject(1);
      actions.next(action);

      spyOn(pollService, 'savePoll').and.callThrough();
      effects.save$.subscribe(() => {
        expect(pollService.savePoll).toHaveBeenCalled();
      });
    });

    it('Should navigate to new poll', () => {
      actions = new ReplaySubject(1);
      actions.next(action);

      effects.save$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/poll/PollId']);
      });
    });
  });
});
