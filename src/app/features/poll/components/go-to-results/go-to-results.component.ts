import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-poll-go-to-results',
  templateUrl: './go-to-results.component.html',
  styleUrls: ['./go-to-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoToResultsComponent {

  @Input() pollId = '';
  constructor() { }

  getResultsLink(): [string] {
    return [`/results/${this.pollId}`];
  }
}
