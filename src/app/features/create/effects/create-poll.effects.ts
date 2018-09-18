import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PollService } from '../../../shared/services/poll.service';

import * as appActions from '../../../actions/app.actions';
import * as createPollActions from '../actions/create-poll.actions';

@Injectable()
export class CreatePollEffects {

  constructor(private actions$: Actions, private pollService: PollService) { }

  @Effect() save$ =
    this.actions$
      .ofType(createPollActions.SAVE)
      .pipe(
        map(action => action as createPollActions.Save),
        map(action => action.poll),
        switchMap(poll => this.pollService.savePoll(poll)
          .pipe(
            map(_pollId => {
              // route to new poll
              return new createPollActions.Clear();
            }),
            catchError(err => of(new appActions.Error(createPollActions.SAVE, err.message))))));
}
