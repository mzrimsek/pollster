import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { ReplaySubject, throwError } from 'rxjs';

import { UserEffects } from './user.effects';

import { AuthService } from '../services/auth.service';

import * as appActions from '../../../actions/app.actions';
import * as userActions from '../actions/user.actions';

import { auth, user } from '../../../test-helpers';

describe('User Effects', () => {
  let actions: any;
  let effects: UserEffects;
  let authService: AuthService;

  const initTests = () => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useClass: auth.MockAuthService }
      ]
    });

    effects = TestBed.get(UserEffects);
    authService = TestBed.get(AuthService);
  };

  describe('Inject', () => {
    beforeEach(() => {
      initTests();
    });

    it('Should be created', () => {
      expect(effects).toBeTruthy();
    });
  });

  describe('Get User', () => {
    describe('Authenticated User', () => {
      beforeEach(() => {
        initTests();
        authService.signInAnonymously();
      });

      it('Should dispatch Authenticated', () => {
        actions = hot('-a', { a: new userActions.GetUser() });
        const expected = cold('-(b)', {
          b: new userActions.Authenticated(user.mockUser)
        });
        expect(effects.getUser$).toBeObservable(expected);
      });
    });

    describe('Not Authenticated User', () => {
      beforeEach(() => {
        initTests();
        authService.signOut();
      });

      it('Should dispatch NotAuthenticated', () => {
        actions = hot('-a', { a: new userActions.GetUser() });
        const expected = cold('-(b)', {
          b: new userActions.NotAuthenticated()
        });
        expect(effects.getUser$).toBeObservable(expected);
      });
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';
      actions = hot('-a', { a: new userActions.GetUser() });

      const expected = cold('-(b)', {
        b: new appActions.Error(userActions.GET_USER, message)
      });

      spyOn(authService, 'getAuthState').and.callFake(() => throwError({ message }));
      expect(effects.getUser$).toBeObservable(expected);
    });

    it('Should call AuthService getAuthState', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.GetUser());

      spyOn(authService, 'getAuthState').and.callThrough();
      effects.getUser$.subscribe(() => {
        expect(authService.getAuthState).toHaveBeenCalled();
      });
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      initTests();
    });

    it('Should dispatch NotAuthenticated', () => {
      actions = hot('-a', { a: new userActions.Logout() });
      const expected = cold('-(b)', {
        b: new userActions.NotAuthenticated()
      });

      expect(effects.logout$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';
      actions = hot('-a', { a: new userActions.Logout() });

      const expected = cold('-(b)', {
        b: new appActions.Error(userActions.LOGOUT, message)
      });

      spyOn(authService, 'signOut').and.callFake(() => throwError({ message }));
      expect(effects.logout$).toBeObservable(expected);
    });

    it('Should call AuthService signOut', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.Logout());

      spyOn(authService, 'signOut').and.callThrough();
      effects.logout$.subscribe(() => {
        expect(authService.signOut).toHaveBeenCalled();
      });
    });
  });

  describe('Twitter Login', () => {
    beforeEach(() => {
      initTests();
    });

    it('Should dispatch GetUser', () => {
      actions = hot('-a', { a: new userActions.AnonymousLogin() });
      const expected = cold('-(b)', {
        b: new userActions.GetUser()
      });
      expect(effects.anonymousLogin$).toBeObservable(expected);
    });

    it('Should dispatch Error on error', () => {
      const message = 'Something went terribly wrong';
      actions = hot('-a', { a: new userActions.AnonymousLogin() });

      const expected = cold('-(b)', {
        b: new appActions.Error(userActions.ANONYMOUS_LOGIN, message)
      });

      spyOn(authService, 'signInAnonymously').and.callFake(() => throwError({ message }));
      expect(effects.anonymousLogin$).toBeObservable(expected);
    });

    it('Should call AuthService signInWithTwitter', () => {
      actions = new ReplaySubject(1);
      actions.next(new userActions.AnonymousLogin());

      spyOn(authService, 'signInAnonymously').and.callThrough();
      effects.anonymousLogin$.subscribe(() => {
        expect(authService.signInAnonymously).toHaveBeenCalled();
      });
    });
  });
});
