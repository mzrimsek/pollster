import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PollService } from '../../shared/services/poll.service';

import pollSelectors, { State } from './reducers/root.reducer';

import { Poll } from '../../shared/models';
import { VoteInfo } from './models';

import { canVote, isInvalid } from './utils/validation.utils';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  pollId = '';
  private now = new Date().getTime();
  poll$: Observable<Poll>;
  voteInfo$: Observable<Dictionary<VoteInfo>>;
  selectedOptions$: Observable<string[]>;
  canVote$: Observable<boolean>;
  isInvalid$: Observable<boolean>;
  constructor(private store: Store<State>,
    private route: ActivatedRoute,
    private pollService: PollService) { }

  ngOnInit() {
    this.voteInfo$ = this.store.select(pollSelectors.voteInfo);
    this.selectedOptions$ = this.store.select(pollSelectors.selectedOption);

    this.route.params.subscribe(params => {
      this.pollId = params.pollId;
      this.poll$ = this.pollService.getPoll(this.pollId);
    });

    this.canVote$ = this.voteInfo$.pipe(map(voteInfo => canVote(voteInfo, this.pollId)));
    this.isInvalid$ = this.poll$.pipe(map(poll => isInvalid(poll, this.now)));
  }
}
