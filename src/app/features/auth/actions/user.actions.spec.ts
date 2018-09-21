import * as actions from './user.actions';

import { user } from '../../../test-helpers';

describe('User Actions', () => {
  describe('GetUser', () => {
    it('Should have correct type', () => {
      const action = new actions.GetUser();
      expect(action.type).toBe(actions.GET_USER);
    });
  });

  describe('Authenticated', () => {
    it('Should have correct type', () => {
      const action = new actions.Authenticated({
        uid: '',
        displayName: '',
        email: '',
        photoURL: '',
        providerId: ''
      });
      expect(action.type).toBe(actions.AUTHENTICATED);
    });

    it('Should have correct user', () => {
      const action = new actions.Authenticated(user.testUser);
      expect(action.user).toEqual(user.testUser);
    });
  });

  describe('NotAuthenticated', () => {
    it('Should have correct type', () => {
      const action = new actions.NotAuthenticated();
      expect(action.type).toBe(actions.NOT_AUTHENTICATED);
    });
  });

  describe('AnonymousAuth', () => {
    it('Should have correct type', () => {
      const action = new actions.AnonymousLogin();
      expect(action.type).toBe(actions.ANONYMOUS_LOGIN);
    });
  });
});
