import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, StoreModule } from '@ngrx/store';

import { OptionComponent } from '../option/option.component';
import { VoteComponent } from './vote.component';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromPoll from '../../reducers/root.reducer';

import { poll } from '../../../../test-helpers';

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VoteComponent,
        OptionComponent
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'poll': combineReducers(fromPoll.reducers)
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
    component.poll = poll.testPoll;
    component.pollId = 'Some PollId';
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
