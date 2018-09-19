import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Poll } from '../../../../shared/models';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent implements OnInit {

  @Input() poll: Poll;
  @Input() pollId = '';
  constructor() { }

  ngOnInit() { }

  getPollOptions(): string[] {
    return Object.entries(this.poll.options).map(([key]) => key);
  }
}
