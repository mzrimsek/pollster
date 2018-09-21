import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsViewComponent } from './results-view.component';

import { poll } from '../../../../test-helpers';

describe('ResultsViewComponent', () => {
  let component: ResultsViewComponent;
  let fixture: ComponentFixture<ResultsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsViewComponent);
    component = fixture.componentInstance;
    component.poll = poll.testPoll;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getPollOptions', () => {
    it('Should return the list of properties', () => {
      const pollOptions = component.getPollOptions();
      expect(pollOptions).toEqual(['Chipotle', 'Sheetz', 'Pulp']);
    });
  });
});
