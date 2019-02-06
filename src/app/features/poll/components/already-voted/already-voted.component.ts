import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { VoteInfo } from '../../models';

@Component({
  selector: 'app-poll-already-voted',
  templateUrl: './already-voted.component.html',
  styleUrls: ['./already-voted.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlreadyVotedComponent {

  @Input() voteInfo: VoteInfo;
  constructor() { }
}
