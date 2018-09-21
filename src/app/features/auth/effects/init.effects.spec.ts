import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';

import { InitEffects } from './init.effects';

import * as userActions from '../../auth/actions/user.actions';
import * as voteActions from '../../poll/actions/vote.actions';

describe('Init Effects', () => {
  let actions: any;
  let effects: InitEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InitEffects,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(InitEffects);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Authenticated', () => {
    it('Should dispatch actions to load data', () => {
      const uid = 'some id';
      const action = new userActions.Authenticated({
        uid,
        displayName: '',
        email: '',
        photoURL: '',
        providerId: ''
      });

      actions = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: new voteActions.LoadVoteInfo(uid)
      });

      expect(effects.authenticated$).toBeObservable(expected);
    });
  });
});
