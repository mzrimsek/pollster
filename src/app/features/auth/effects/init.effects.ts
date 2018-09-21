import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { map, mergeMap } from 'rxjs/operators';

import * as voteActions from '../../poll/actions/vote.actions';
import * as userActions from '../actions/user.actions';

@Injectable()
export class InitEffects {

  constructor(private actions$: Actions) { }

  @Effect() authenticated$ =
    this.actions$
      .ofType(userActions.AUTHENTICATED)
      .pipe(
        map(action => action as userActions.Authenticated),
        mergeMap(action => [
          new voteActions.LoadVoteInfo(action.user.uid)
        ])
      );
}
