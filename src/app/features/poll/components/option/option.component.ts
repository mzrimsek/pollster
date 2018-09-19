import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

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
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  vote() {
    const payload: VotePayload = {
      pollId: this.pollId,
      option: this.option
    };
    this.store.dispatch(new voteActions.Vote(payload));
  }
}
