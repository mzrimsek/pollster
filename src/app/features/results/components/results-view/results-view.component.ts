import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Poll } from '../../../../shared/models';
import { BarGraphConfig, GraphDataItem } from '../../models';

import { getOptionsFrom } from '../../../../shared/utils/option.utils';

@Component({
  selector: 'app-results-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsViewComponent implements OnInit {

  @Input() poll: Poll;
  @Input() config: BarGraphConfig;
  constructor() { }

  ngOnInit() { }

  getPollResults(): GraphDataItem[] {
    const options = getOptionsFrom(this.poll);
    return options.map(option => {
      return {
        name: option,
        value: this.poll.options[option]
      } as GraphDataItem;
    });
  }
}
