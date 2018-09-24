import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { PollService } from '../../shared/services/poll.service';

import pollSelectors, { State } from './reducers/root.reducer';

import { Poll } from '../../shared/models';
import { VoteInfo } from './models';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  pollId = '';
  poll$: Observable<Poll>;
  voteInfo$: Observable<Dictionary<VoteInfo>>;
  selectedOption$: Observable<string>;
  constructor(private store: Store<State>,
    private route: ActivatedRoute,
    private pollService: PollService) { }

  ngOnInit() {
    this.voteInfo$ = this.store.select(pollSelectors.voteInfo);
    this.selectedOption$ = this.store.select(pollSelectors.selectedOption);

    this.route.params.subscribe(params => {
      this.pollId = params.pollId;
      this.poll$ = this.pollService.getPoll(this.pollId);
    });
  }
}
