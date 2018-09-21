import { of } from 'rxjs';

import { State as UserState } from '../features/auth/reducers/user.reducer';

import { User } from '../features/auth/models';

export namespace user {
  export const testUser: User = {
    uid: 'some uid',
    email: null,
    displayName: null,
    photoURL: null,
    providerId: ''
  };

  export const userServiceStub = {
    getUser: jasmine.createSpy('getUser').and.returnValue(of(testUser)),
  };

  export const initialUserState: UserState = {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
    providerId: ''
  };
}
