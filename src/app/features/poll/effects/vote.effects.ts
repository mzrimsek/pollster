import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { PollService } from '../../../shared/services/poll.service';
import { VoteService } from '../../../shared/services/vote.service';

import * as appActions from '../../../actions/app.actions';
import * as voteActions from '../actions/vote.actions';

@Injectable()
export class VoteEffects {

  constructor(private actions$: Actions, private pollService: PollService, private voteService: VoteService) { }

  @Effect() vote$ =
    this.actions$
      .ofType(voteActions.VOTE)
      .pipe(
        map(action => action as voteActions.Vote),
        map(action => action.payload),
        switchMap(payload => this.pollService.saveVote(payload)
          .pipe(
            mergeMap(data => [
              new voteActions.VoteSucceeded(),
              new voteActions.TrackVote(data)
            ]),
            catchError(err => of(new appActions.Error(voteActions.VOTE, err.message))))));

  @Effect() trackVote$ =
    this.actions$
      .ofType(voteActions.TRACK_VOTE)
      .pipe(
        map(action => action as voteActions.TrackVote),
        map(action => action.payload),
        switchMap(payload => this.voteService.trackVote(payload)
          .pipe(
            map(() => new voteActions.TrackVoteSucceeded()),
            catchError(err => of(new appActions.Error(voteActions.TRACK_VOTE, err.message))))));
}
