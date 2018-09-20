import { of } from 'rxjs';

import { State as UserState } from '../features/auth/reducers/user.reducer';

import { User } from '../features/auth/models';

export namespace user {
  export const mockUser: User = {
    uid: 'some id',
    displayName: 'Jim Bob',
    email: 'jimbob@jimbob.com',
    photoURL: 'jimbob.com/jimbob.png',
    providerId: 'google.com'
  };

  export const userServiceStub = {
    getUser: jasmine.createSpy('getUser').and.returnValue(of(mockUser)),
  };

  export const initialUserState: UserState = {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
    providerId: ''
  };
}
