import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule, MatRadioModule } from '@angular/material';

import { SingleOptionComponent } from './single-option.component';

describe('SingleOptionComponent', () => {
  let component: SingleOptionComponent;
  let fixture: ComponentFixture<SingleOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleOptionComponent],
      imports: [
        MatRadioModule,
        MatListModule
      ]
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should emit optionSelected when emitOptionSelected is called', () => {
    spyOn(component.optionSelected, 'emit');
    component.emitOptionSelected('Chipotle');
    expect(component.optionSelected.emit).toHaveBeenCalledWith({
      option: 'Chipotle'
    });
  });
});
