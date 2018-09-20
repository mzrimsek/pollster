import { Injectable } from '@angular/core';

import { User as AuthUser } from '@firebase/auth-types';
import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

import * as appActions from '../../../actions/app.actions';
import * as authActions from '../actions/user.actions';

import { User } from '../models';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private authService: AuthService) { }

  @Effect() getUser$ =
    this.actions$
      .ofType(authActions.GET_USER)
      .pipe(
        map(action => action as authActions.GetUser),
        switchMap(() => this.authService.getAuthState()
          .pipe(
            map(authData => {
              if (authData) {
                return this.getAuthenticatedAction(authData);
              }
              return new authActions.NotAuthenticated();
            }),
            catchError(err => of(new appActions.Error(authActions.GET_USER, err.message))))));

  @Effect() anonymousLogin$ =
    this.actions$
      .ofType(authActions.ANONYMOUS_LOGIN)
      .pipe(
        map(action => action as authActions.AnonymousLogin),
        switchMap(() => this.authService.signInAnonymously()
          .pipe(
            map(() => new authActions.GetUser()),
            catchError(err => of(new appActions.Error(authActions.ANONYMOUS_LOGIN, err.message))))));

  @Effect() logout$ =
    this.actions$
      .ofType(authActions.LOGOUT)
      .pipe(
        map(action => action as authActions.Logout),
        switchMap(() => this.authService.signOut()
          .pipe(
            map(() => new authActions.NotAuthenticated()),
            catchError(err => of(new appActions.Error(authActions.LOGOUT, err.message))))));

  private getAuthenticatedAction(authData: AuthUser): authActions.Authenticated {
    const providerData = authData.providerData[0];
    const user = <User>{
      uid: authData.uid,
      displayName: authData.displayName,
      email: authData.email,
      photoURL: authData.photoURL,
      providerId: providerData ? providerData.providerId : ''
    };
    return new authActions.Authenticated(user);
  }
}


