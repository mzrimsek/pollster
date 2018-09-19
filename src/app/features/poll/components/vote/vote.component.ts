import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as voteActions from '../../actions/vote.actions';

import { State } from '../../reducers/root.reducer';

import { Poll, VotePayload } from '../../../../shared/models';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent implements OnInit {

  @Input() poll: Poll;
  @Input() pollId = '';
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  getPollOptions(): string[] {
    return Object.entries(this.poll.options).map(([key]) => key);
  }

  vote(option: string) {
    const payload: VotePayload = {
      pollId: this.pollId,
      option
    };
    this.store.dispatch(new voteActions.Vote(payload));
  }
}
