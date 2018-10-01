import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ExpiredComponent } from './expired.component';

describe('ExpiredComponent', () => {
  let component: ExpiredComponent;
  let fixture: ComponentFixture<ExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpiredComponent],
      imports: [
        RouterTestingModule,
        MatCardModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredComponent);
    component = fixture.componentInstance;
    component.pollId = 'someId';
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getResultsLink', () => {
    it('Should return routing information', () => {
      const result = component.getResultsLink();
      expect(result).toEqual(['/results/someId']);
    });
  });
});
