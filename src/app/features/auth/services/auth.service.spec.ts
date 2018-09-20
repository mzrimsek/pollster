import { TestBed } from '@angular/core/testing';

import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { auth } from '../../../test-helpers';

describe('Auth Service', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: auth.angularFireAuthStub }
      ]
    });

    service = TestBed.get(AuthService);
    afAuth = TestBed.get(AngularFireAuth);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAuthState', () => {
    let isAuth$: Subscription;
    let isAuthRef: boolean;

    beforeEach(() => {
      isAuth$ = service.getAuthState()
        .pipe(map(firebaseUser => firebaseUser !== null))
        .subscribe(isAuth => isAuthRef = isAuth);
    });

    afterEach(() => {
      auth.fakeAuthState.next(null);
      isAuth$.unsubscribe();
    });

    it('Should return null when not authenticated', () => {
      expect(isAuthRef).toBe(false);
    });

    it('Should return user info when authenticated ', () => {
      service.signInAnonymously();
      expect(isAuthRef).toBe(true);
    });
  });

  describe('signInAnonymously', () => {
    it('Should call AngularFireAuth signInAnonymously', () => {
      service.signInAnonymously();
      expect(afAuth.auth.signInAnonymously).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('Should call AngularFireAuth signOut', () => {
      service.signOut();
      expect(afAuth.auth.signOut).toHaveBeenCalled();
    });
  });
});
