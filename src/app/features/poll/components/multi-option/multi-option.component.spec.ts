import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule, MatListModule } from '@angular/material';

import { MultiOptionComponent } from './multi-option.component';

describe('MultiOptionComponent', () => {
  let component: MultiOptionComponent;
  let fixture: ComponentFixture<MultiOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiOptionComponent],
      imports: [
        MatCheckboxModule,
        MatListModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiOptionComponent);
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
