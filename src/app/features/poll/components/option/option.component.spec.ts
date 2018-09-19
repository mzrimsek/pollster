import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { OptionComponent } from './option.component';

import * as voteActions from '../../actions/vote.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromPoll from '../../reducers/root.reducer';

describe('OptionComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionComponent],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'poll': combineReducers(fromPoll.reducers)
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionComponent);
    component = fixture.componentInstance;
    component.pollId = 'Some PollId';
    component.option = 'Chipotle';
    component.value = 0;

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When vote button clicked', () => {
    let voteButton: any;

    beforeEach(() => {
      voteButton = fixture.nativeElement.querySelector('.option button');
    });

    it('Should dispatch Vote when button is clicked', () => {
      voteButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(new voteActions.Vote({
        pollId: 'Some PollId',
        option: 'Chipotle'
      }));
    });
  });
});
