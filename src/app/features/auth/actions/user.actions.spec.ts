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
      const action = new actions.Authenticated(user.mockUser);
      expect(action.user).toEqual(user.mockUser);
    });
  });

  describe('NotAuthenticated', () => {
    it('Should have correct type', () => {
      const action = new actions.NotAuthenticated();
      expect(action.type).toBe(actions.NOT_AUTHENTICATED);
    });
  });

  describe('GetUser', () => {
    it('Should have correct type', () => {
      const action = new actions.Logout();
      expect(action.type).toBe(actions.LOGOUT);
    });
  });

  describe('AnonymousAuth', () => {
    it('Should have correct type', () => {
      const action = new actions.AnonymousLogin();
      expect(action.type).toBe(actions.ANONYMOUS_LOGIN);
    });
  });

  describe('Logout', () => {
    it('Should have correct type', () => {
      const action = new actions.Logout();
      expect(action.type).toBe(actions.LOGOUT);
    });
  });
});
