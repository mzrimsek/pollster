import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { PollService } from '../../../shared/services/poll.service';

import * as appActions from '../../../actions/app.actions';
import * as voteInfoActions from '../actions/vote-info.actions';
import * as voteActions from '../actions/vote.actions';

@Injectable()
export class VoteEffects {

  constructor(private actions$: Actions, private pollService: PollService) { }

  @Effect() vote$ =
    this.actions$
      .ofType(voteActions.VOTE)
      .pipe(
        map(action => action as voteActions.Vote),
        map(action => action.payload),
        switchMap(payload => this.pollService.saveVote(payload)
          .pipe(
            mergeMap(data => [
              new voteActions.VoteSucceeded(data),
              new voteActions.Clear()
            ]),
            catchError(err => of(new appActions.Error(voteActions.VOTE, err.message))))));

  @Effect() voteSucceeded$ =
    this.actions$
      .ofType(voteActions.VOTE_SUCCEEDED)
      .pipe(
        map(action => action as voteActions.VoteSucceeded),
        map(action => new voteInfoActions.TrackVote(action.payload)));
}
