import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

import * as voteActions from '../../actions/vote.actions';

import { State } from '../../reducers/vote-info.reducer';

import { Poll, VotePayload } from '../../../../shared/models';

import { getOptionsFrom } from '../../../../shared/utils/option.utils';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent implements OnInit {

  @Input() poll: Poll;
  @Input() pollId = '';
  @Input() selectedOption = '';
  private userId = '';
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.userId = user.uid);
  }

  getPollOptions(): string[] {
    return getOptionsFrom(this.poll);
  }

  setOption(option: string) {
    this.store.dispatch(new voteActions.SetVoteOption(option));
  }

  vote() {
    const payload: VotePayload = {
      userId: this.userId,
      pollId: this.pollId,
      option: this.selectedOption
    };
    this.store.dispatch(new voteActions.Vote(payload));
  }
}
