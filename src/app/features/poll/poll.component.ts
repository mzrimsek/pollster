import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { PollService } from '../../shared/services/poll.service';
import { UserService } from '../auth/services/user.service';

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
  userId = '';
  poll$: Observable<Poll>;
  voteInfo$: Observable<VoteInfo>;
  hasVoted$: Observable<boolean>;
  constructor(private store: Store<State>,
    private route: ActivatedRoute,
    private pollService: PollService,
    private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pollId = params.pollId;
      this.poll$ = this.pollService.getPoll(this.pollId);
    });
    this.userService.getUser().subscribe(user => this.userId = user.uid);
    this.voteInfo$ = this.store.select(pollSelectors.voteInfo);
    this.hasVoted$ = this.store.select(pollSelectors.hasVoted);
  }
}
