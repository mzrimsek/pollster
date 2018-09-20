import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Poll } from '../../../../shared/models';

import * as voteActions from '../../actions/vote.actions';

import { Store } from '@ngrx/store';

import { State } from '../../reducers/root.reducer';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent implements OnInit {

  @Input() poll: Poll;
  @Input() pollId = '';
  @Input() userId = '';
  constructor(private store: Store<State>) { }

  ngOnInit() { 
    this.store.dispatch(new voteActions.LoadVoteInfo(this.userId, this.pollId));
  }

  getPollOptions(): string[] {
    return Object.entries(this.poll.options).map(([key]) => key);
  }
}
