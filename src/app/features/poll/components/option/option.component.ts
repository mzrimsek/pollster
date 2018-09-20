import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

import * as voteActions from '../../actions/vote.actions';

import { State } from '../../reducers/root.reducer';

import { VotePayload } from '../../../../shared/models';

@Component({
  selector: 'app-poll-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  @Input() pollId = '';
  @Input() option = '';
  @Input() value = 0;
  private userId = '';
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.userId = user.uid).unsubscribe();
  }

  vote() {
    const payload: VotePayload = {
      userId: this.userId,
      pollId: this.pollId,
      option: this.option
    };
    this.store.dispatch(new voteActions.Vote(payload));
  }
}
