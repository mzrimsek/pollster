import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { OptionComponent } from './components/option/option.component';
import { CreateComponent } from './create.component';

import { UserService } from '../auth/services/user.service';

import * as fromRoot from '../../reducers/root.reducer';
import * as fromCreate from './reducers/root.reducer';

import { user } from '../../test-helpers';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateComponent,
        CreatePollComponent,
        OptionComponent
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'create': combineReducers(fromCreate.reducers)
        })
      ],
      providers: [{ provide: UserService, useValue: user.userServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.callThrough();

    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should select createPollInfo', () => {
    expect(store.select).toHaveBeenCalledWith(fromCreate._selectCreatePollInfo);
  });
});
