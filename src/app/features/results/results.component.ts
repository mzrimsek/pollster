import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { PollService } from '../../shared/services/poll.service';

import { Poll } from '../../shared/models';
import { BarGraphConfig } from './models';

import { selectColorScheme } from './utils/color-scheme.utils';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  poll$: Observable<Poll>;

  config: BarGraphConfig = {
    view: undefined,
    colorScheme: {
      domain: selectColorScheme('cool')
    },
    showLegend: false,
    gradient: false,
    animations: true,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: false,
    showYAxisLabel: false,
    showGridLines: true,
    xAxisLabel: 'X',
    yAxisLabel: 'Y',
    axisTickFormatting: x => x,
    scaleMax: 5
  };
  constructor(private route: ActivatedRoute, private pollService: PollService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const pollId = params.pollId;
      this.poll$ = this.pollService.getPoll(pollId);
    });
  }
}
