import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

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
      declarations: [VoteComponent],
      imports: [
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
    it('Should dispatch SetVoteOption', () => {
      const firstOption = fixture.nativeElement.querySelector('.vote .options li:first-child input');
      firstOption.dispatchEvent(new Event('change'));
      expect(store.dispatch).toHaveBeenCalledWith(new voteActions.SetVoteOption('Chipotle'));
    });
  });

  describe('When voteButton is clicked', () => {
    it('Should dispatch Vote', () => {
      component.selectedOption = 'Chipotle';
      const voteButton = fixture.nativeElement.querySelector('.vote button');
      voteButton.disabled = false;
      voteButton.click();

      expect(store.dispatch).toHaveBeenCalledWith(new voteActions.Vote({
        pollId: 'Some PollId',
        option: 'Chipotle',
        userId: user.testUser.uid
      }));
    });
  });
});
