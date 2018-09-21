import { _selectUserData, AuthState, State } from './root.reducer';

import { user } from '../../../test-helpers';

describe('Auth Root Reducer', () => {
  describe('User State Selectors', () => {
    describe('_selectUserData', () => {
      it('Should return user data', () => {
        const authState: AuthState = {
          user: {
            ...user.initialUserState
          }
        };
        const state: State = { auth: authState };

        const result = _selectUserData(state);

        expect(result).toEqual(user.initialUserState);
      });
    });
  });
});

