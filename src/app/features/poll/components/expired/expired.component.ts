import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll-expired',
  templateUrl: './expired.component.html',
  styleUrls: ['./expired.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpiredComponent implements OnInit {

  @Input() pollId = '';
  constructor() { }

  ngOnInit() { }

  getResultsLink(): [string] {
    return [`/results/${this.pollId}`];
  }
}
