import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { VoteInfo } from '../../models';

@Component({
  selector: 'app-poll-already-voted',
  templateUrl: './already-voted.component.html',
  styleUrls: ['./already-voted.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlreadyVotedComponent implements OnInit {

  @Input() voteInfo: VoteInfo;
  constructor() { }

  ngOnInit() { }

  getResultsLink(): [string] {
    return [`/results/${this.voteInfo.pollId}`];
  }

}
