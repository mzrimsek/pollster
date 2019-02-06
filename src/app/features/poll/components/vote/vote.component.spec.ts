import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatListModule, MatRadioModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { GoToResultsComponent } from '../go-to-results/go-to-results.component';
import { MultiOptionComponent } from '../multi-option/multi-option.component';
import { SingleOptionComponent } from '../single-option/single-option.component';
import { VoteComponent } from './vote.component';

import { UserService } from '../../../auth/services/user.service';

import * as voteActions from '../../actions/vote.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromPoll from '../../reducers/root.reducer';

import { poll, user } from '../../../../test-helpers';

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VoteComponent,
        SingleOptionComponent,
        MultiOptionComponent,
        GoToResultsComponent
      ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatListModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'poll': combineReducers(fromPoll.reducers)
        })
      ],
      providers: [{ provide: UserService, useValue: user.userServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
    component.poll = poll.testPoll;
    component.pollId = 'Some PollId';

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should disable vote button', () => {
    const voteButton = fixture.nativeElement.querySelector('.vote button');
    expect(voteButton.disabled).toBe(true);
  });

  describe('getPollOptions', () => {
    it('Should return the list of properties', () => {
      const pollOptions = component.getPollOptions();
      expect(pollOptions).toEqual(['Chipotle', 'Sheetz', 'Pulp']);
    });
  });

  describe('When option is selected', () => {
    xit('Should dispatch SetVoteOption', () => {
      const firstOption = fixture.nativeElement.querySelector('.vote .options app-poll-single-option:first-child');
      firstOption.dispatchEvent(new Event('optionSelected'), {
        option: 'Chipotle'
      });
      expect(store.dispatch).toHaveBeenCalledWith(new voteActions.SetVoteOptions(['Chipotle']));
    });
  });

  describe('When voteButton is clicked', () => {
    it('Should dispatch Vote', () => {
      component.selectedOptions = ['Chipotle'];
      const voteButton = fixture.nativeElement.querySelector('.vote button');
      voteButton.disabled = false;
      voteButton.click();

      expect(store.dispatch).toHaveBeenCalledWith(new voteActions.Vote({
        pollId: 'Some PollId',
        options: ['Chipotle'],
        userId: user.testUser.uid
      }));
    });
  });
});
