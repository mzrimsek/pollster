import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Poll } from '../../../../shared/models';

import { getOptionsFrom } from '../../../../shared/utils/option.utils';

@Component({
  selector: 'app-results-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsViewComponent implements OnInit {

  @Input() poll: Poll;
  constructor() { }

  ngOnInit() { }

  getPollOptions(): string[] {
    return getOptionsFrom(this.poll);
  }
}
