import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, MatListModule, MatNativeDateModule, MatSlideToggleModule
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
        MatNativeDateModule,
        MatDatepickerModule,
        MatSlideToggleModule,
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

    it('Should not dispatch Save when in invalid state', () => {
      spyOn(component, 'isSaveDisabled').and.returnValue(true);
      saveButton.click();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    xit('Should dispatch Save when in valid state', () => {
      spyOn(component, 'isSaveDisabled').and.returnValue(false);
      saveButton.click();
      expect(store.dispatch).toHaveBeenCalled();
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

  describe('When set poll end toggle changes', () => {
    let setPollEndToggle: any;

    beforeEach(() => {
      setPollEndToggle = fixture.nativeElement.querySelector('.create-poll .valid-until mat-slide-toggle');
    });

    it('Should dispatch SetHasEnd with true', () => {
      setPollEndToggle.dispatchEvent(new Event('change'));
      expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.SetHasEnd(true));
    });

    describe('When hasEnd is true', () => {
      beforeEach(() => {
        component.hasEnd = true;
      });

      it('Should dispatch SetHasEnd with false', () => {
        setPollEndToggle.dispatchEvent(new Event('change'));
        expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.SetHasEnd(false));
      });

      it('Should dispatch SetValidUntil with null', () => {
        setPollEndToggle.dispatchEvent(new Event('change'));
        expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.SetValidUntil(null));
      });
    });
  });

  describe('When valid until input element changes', () => {
    let validUntilElement: any;

    beforeEach(() => {
      component.hasEnd = true;
      fixture.detectChanges();
      validUntilElement = fixture.nativeElement.querySelector('.create-poll .valid-until input');
    });

    xit('Should dispatch SetValidUntil', () => {
      validUntilElement.value = 100000;
      validUntilElement.dispatchEvent(new Event('dateChange'));
      expect(store.dispatch).toHaveBeenCalledWith(new createPollActions.SetValidUntil(100000));
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

  describe('isSaveDisabled', () => {
    it('Should return true when title is empty', () => {
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
      const result = component.isSaveDisabled();
      expect(result).toBe(true);
    });

    it('Should return true when less than 2 options', () => {
      component.info = {
        title: 'Poll',
        selectionMode: 'SINGLE',
        validUntil: null,
        options: [{
          id: 1,
          value: 'Option 1'
        }]
      };
      const result = component.isSaveDisabled();
      expect(result).toBe(true);
    });

    it('Should return true when hasEnd is true and validUntil is null', () => {
      component.info = {
        title: 'Poll',
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
      component.hasEnd = true;
      const result = component.isSaveDisabled();
      expect(result).toBe(true);
    });

    it('Should return false when in valid state', () => {
      component.info = {
        title: 'Poll',
        selectionMode: 'SINGLE',
        validUntil: 100000,
        options: [{
          id: 1,
          value: 'Option 1'
        }, {
          id: 2,
          value: 'Option 2'
        }]
      };
      component.hasEnd = true;
      const result = component.isSaveDisabled();
      expect(result).toBe(false);
    });
  });
});
