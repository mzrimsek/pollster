import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PollService } from '../../../shared/services/poll.service';
import { VoteService } from '../services/vote.service';

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
            map(data => new voteActions.VoteSucceeded(data)),
            catchError(err => of(new appActions.Error(voteActions.VOTE, err.message))))));

  @Effect() voteSucceeded$ =
    this.actions$
      .ofType(voteActions.VOTE_SUCCEEDED)
      .pipe(
        map(action => action as voteActions.VoteSucceeded),
        map(action => new voteActions.TrackVote(action.payload)));


  @Effect() trackVote$ =
    this.actions$
      .ofType(voteActions.TRACK_VOTE)
      .pipe(
        map(action => action as voteActions.TrackVote),
        map(action => action.payload),
        switchMap(payload => this.voteService.trackVote(payload)
          .pipe(
            map(data => new voteActions.TrackVoteSucceeded(data)),
            catchError(err => of(new appActions.Error(voteActions.TRACK_VOTE, err.message))))));

  @Effect() loadVoteInfo$ =
    this.actions$
      .ofType(voteActions.LOAD_VOTE_INFO)
      .pipe(
        map(action => action as voteActions.LoadVoteInfo),
        switchMap(action => this.voteService.getVotesForUser(action.userId)
          .pipe(
            map(votes => new voteActions.LoadVoteInfoSucceeded(votes)),
            catchError(err => of(new appActions.Error(voteActions.LOAD_VOTE_INFO, err.message))))));
}
