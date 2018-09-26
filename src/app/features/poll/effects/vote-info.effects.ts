import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { VoteService } from '../services/vote.service';

import * as appActions from '../../../actions/app.actions';
import * as voteInfoActions from '../actions/vote-info.actions';

@Injectable()
export class VoteInfoEffects {

  constructor(private actions$: Actions, private voteService: VoteService) { }

  @Effect() trackVote$ =
    this.actions$
      .ofType(voteInfoActions.TRACK_VOTE)
      .pipe(
        map(action => action as voteInfoActions.TrackVote),
        map(action => action.payload),
        switchMap(payload => this.voteService.trackVote(payload)
          .pipe(
            map(data => new voteInfoActions.TrackVoteSucceeded(data)),
            catchError(err => of(new appActions.Error(voteInfoActions.TRACK_VOTE, err.message))))));

  @Effect() loadVoteInfo$ =
    this.actions$
      .ofType(voteInfoActions.LOAD_VOTE_INFO)
      .pipe(
        map(action => action as voteInfoActions.LoadVoteInfo),
        switchMap(action => this.voteService.getVotesForUser(action.userId)
          .pipe(
            map(votes => new voteInfoActions.LoadVoteInfoSucceeded(votes)),
            catchError(err => of(new appActions.Error(voteInfoActions.LOAD_VOTE_INFO, err.message))))));
}
