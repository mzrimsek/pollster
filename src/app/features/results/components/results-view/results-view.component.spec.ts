import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatListModule } from '@angular/material';

import { ResultsViewComponent } from './results-view.component';

import { selectColorScheme } from '../../utils/color-scheme.utils';

import { poll } from '../../../../test-helpers';

describe('ResultsViewComponent', () => {
  let component: ResultsViewComponent;
  let fixture: ComponentFixture<ResultsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsViewComponent],
      imports: [
        MatCardModule,
        MatListModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsViewComponent);
    component = fixture.componentInstance;
    component.poll = poll.testPoll;
    component.config = {
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
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getPollResults', () => {
    it('Should return the list of graph items', () => {
      const pollResults = component.getPollResults();
      expect(pollResults).toEqual([{
        name: 'Chipotle',
        value: 0
      }, {
        name: 'Sheetz',
        value: 0
      }, {
        name: 'Pulp',
        value: 0
      }]);
    });
  });
});
