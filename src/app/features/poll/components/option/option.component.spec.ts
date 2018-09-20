import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { OptionComponent } from './option.component';

import { UserService } from '../../../auth/services/user.service';

import * as voteActions from '../../actions/vote.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromPoll from '../../reducers/root.reducer';

import { user } from '../../../../test-helpers';

describe('OptionComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;
  let store: Store<fromRoot.State>;
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionComponent],
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
    fixture = TestBed.createComponent(OptionComponent);
    component = fixture.componentInstance;
    component.pollId = 'Some PollId';
    component.option = 'Chipotle';
    component.value = 0;

    service = TestBed.get(UserService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call userService getUser', () => {
    expect(service.getUser).toHaveBeenCalled();
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
        option: 'Chipotle',
        userId: user.mockUser.uid
      }));
    });
  });
});
