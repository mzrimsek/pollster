import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
    MatListModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { OptionComponent } from '../option/option.component';
import { CreatePollComponent } from './create-poll.component';

import { UserService } from '../../../auth/services/user.service';

import * as createPollActions from '../../actions/create-poll.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromCreate from '../../reducers/root.reducer';

import { user } from '../../../../test-helpers';

describe('CreatePollComponent', () => {
  let component: CreatePollComponent;
  let fixture: ComponentFixture<CreatePollComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreatePollComponent,
        OptionComponent
      ],
      imports: [
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatCardModule,
        NoopAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'create': combineReducers(fromCreate.reducers)
        })
      ],
      providers: [{ provide: UserService, useValue: user.userServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePollComponent);
    component = fixture.componentInstance;
    component.info = {
      title: '',
      options: [],
      selectionMode: 'SINGLE',
      validUntil: null
    };

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When title element value changes', () => {
    let titleElement: any;

    beforeEach(() => {
      titleElement = fixture.nativeElement.querySelector('.create-poll .title input');
    });

    it('Should dispatch setTitle', () => {
      titleElement.value = 'Some Title';
      titleElement.dispatchEvent(new Event('change'));
      expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.SetTitle('Some Title'));
    });

    it('Should not dispatch setTitle when value is empty', () => {
      titleElement.value = '';
      titleElement.dispatchEvent(new Event('change'));
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('When add option button is clicked', () => {
    let optionInput: any;
    let addOptionButton: any;

    beforeEach(() => {
      optionInput = fixture.nativeElement.querySelector('.create-poll .add-option input');
      addOptionButton = fixture.nativeElement.querySelector('.create-poll .add-option button');
    });

    it('Should dispatch AddOption', () => {
      optionInput.value = 'Some Option';
      addOptionButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.AddOption(1, 'Some Option'));
    });

    it('Should reset option input', () => {
      optionInput.value = 'Some Option';
      addOptionButton.click();
      expect(optionInput.value).toBe('');
    });

    it('Should not dispatch AddOption when option value is empty', () => {
      addOptionButton.click();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('When save button is clicked', () => {
    let saveButton: any;

    beforeEach(() => {
      saveButton = fixture.nativeElement.querySelector('.create-poll .actions .save button');
      spyOn(component, 'getNowTime').and.returnValue(10000);
    });

    describe('When in invalid state', () => {
      it('Should not dispatch Save when title is empty', () => {
        component.info = {
          title: '',
          selectionMode: 'SINGLE',
          validUntil: null,
          options: [{
            id: 1,
            value: 'Option 1'
          }, {
            id: 2,
            value: 'Option 2'
          }]
        };
        saveButton.click();
        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('Should not dispatch Save when less than two options', () => {
        component.info = {
          title: 'Some Title',
          selectionMode: 'SINGLE',
          validUntil: null,
          options: [{
            id: 1,
            value: 'Option 1'
          }]
        };
        saveButton.click();
        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });

    describe('When in valid state', () => {
      it('Should dispatch Save', () => {
        component.info = {
          title: 'Some Title',
          selectionMode: 'SINGLE',
          validUntil: null,
          options: [{
            id: 1,
            value: 'Option 1'
          }, {
            id: 2,
            value: 'Option 2'
          }]
        };
        saveButton.disabled = false;
        saveButton.click();
        expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.Save({
          title: 'Some Title',
          selectionMode: 'SINGLE',
          validUntil: null,
          options: {
            'Option 1': 0,
            'Option 2': 0
          },
          createdAt: 10000,
          createdByName: 'Anonymous',
          createdByUid: 'some uid'
        }));
      });
    });
  });

  describe('When selectionMode input element changes', () => {
    let selectionModeElement: any;

    beforeEach(() => {
      selectionModeElement = fixture.nativeElement.querySelector('.create-poll .selection-mode mat-checkbox');
    });

    it('Should dispatch setMode with "SINGLE" when unchecked', () => {
      selectionModeElement.checked = false;
      selectionModeElement.dispatchEvent(new Event('change'));
      expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.SetMode('SINGLE'));
    });

    xit('Should dispatch setMode with "MULTI" when checked', () => {
      selectionModeElement.checked = true;
      selectionModeElement.dispatchEvent(new Event('change'));
      expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.SetMode('MULTI'));
    });
  });

  describe('When reset button is clicked', () => {
    let resetButton: any;

    beforeEach(() => {
      resetButton = fixture.nativeElement.querySelector('.create-poll .actions .reset button');
    });

    it('Should dispatch Clear', () => {
      resetButton.click();
      expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.Clear());
    });
  });
});
