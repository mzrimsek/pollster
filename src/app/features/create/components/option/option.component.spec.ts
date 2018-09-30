import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { OptionComponent } from './option.component';

import * as createPollActions from '../../actions/create-poll.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromCreate from '../../reducers/root.reducer';

describe('OptionComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionComponent],
      imports: [
        MatListModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'create': combineReducers(fromCreate.reducers)
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionComponent);
    component = fixture.componentInstance;
    component.option = {
      id: 1,
      value: 'Some Option'
    };

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When remove button is clicked', () => {
    let removeButton: any;

    beforeEach(() => {
      removeButton = fixture.nativeElement.querySelector('.option button');
    });

    it('Should dispatch removeOption', () => {
      removeButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.RemoveOption(1));
    });
  });
});
