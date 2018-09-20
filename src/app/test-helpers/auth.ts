import { User as AuthUser } from '@firebase/auth-types';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { user } from './user';

export namespace auth {
  export const fakeAuthState = new BehaviorSubject<any>(null);

  const fakeSignInHandler = (): Promise<any> => {
    fakeAuthState.next(user.mockUser);
    return Promise.resolve(user.mockUser);
  };
  const fakeSignOutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    return Promise.resolve();
  };
  export const angularFireAuthStub = {
    authState: fakeAuthState,
    auth: {
      signOut: jasmine
        .createSpy('signOut')
        .and
        .callFake(fakeSignOutHandler),
      signInAnonymously: jasmine
        .createSpy('signInAnonymously')
        .and
        .callFake(fakeSignInHandler)
    }
  };

  export class MockAuthService {
    private authState: Observable<any>;

    constructor() {
      this.authState = of(null);
    }

    getAuthState(): Observable<AuthUser | null> {
      return this.authState;
    }

    signInAnonymously(): Observable<any> {
      this.authState = of({
        ...user.mockUser,
        providerData: [{
          ...user.mockUser
        }]
      });
      return of('Logged in anonymously');
    }

    signOut(): Observable<any> {
      this.authState = of(null);
      return of('Logged out');
    }
  }
}
