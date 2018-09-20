import { _selectUserData, _selectUserLoggedIn, AuthState, State } from './root.reducer';

import { user } from '../../../test-helpers';

describe('Auth Root Reducer', () => {
  describe('User State Selectors', () => {
    describe('_selectUserLoggedIn', () => {
      it('Should return true if uid is set', () => {
        const authState: AuthState = {
          user: {
            ...user.initialUserState,
            uid: 'some uid'
          }
        };
        const state: State = { auth: authState };

        const result = _selectUserLoggedIn(state);

        expect(result).toBe(true);
      });

      it('Should return false if uid is not set', () => {
        const authState: AuthState = {
          user: user.initialUserState
        };
        const state: State = { auth: authState };

        const result = _selectUserLoggedIn(state);

        expect(result).toBe(false);
      });
    });
  });
});

