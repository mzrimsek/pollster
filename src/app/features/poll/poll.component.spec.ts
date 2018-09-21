import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { AlreadyVotedComponent } from './components/already-voted/already-voted.component';
import { OptionComponent } from './components/option/option.component';
import { VoteComponent } from './components/vote/vote.component';
import { PollComponent } from './poll.component';

import { PollService } from '../../shared/services/poll.service';

import * as fromRoot from '../../reducers/root.reducer';
import * as fromPoll from './reducers/root.reducer';

import { poll, routing } from '../../test-helpers';

describe('PollComponent', () => {
  let component: PollComponent;
  let fixture: ComponentFixture<PollComponent>;
  let store: Store<fromRoot.State>;
  let service: PollService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PollComponent,
        VoteComponent,
        OptionComponent,
        AlreadyVotedComponent
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'poll': combineReducers(fromPoll.reducers)
        }),
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: routing.activatedRouteStub },
        { provide: PollService, useClass: poll.MockPollService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollComponent);
    component = fixture.componentInstance;

    service = TestBed.get(PollService);
    store = TestBed.get(Store);
    spyOn(store, 'select').and.callThrough();

    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  xit('Should call pollService getPoll with pollId from route params', () => {
    spyOn(service, 'getPoll');
    expect(service.getPoll).toHaveBeenCalledWith('Some PollId');
  });
});
