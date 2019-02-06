import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GoToResultsComponent } from './go-to-results.component';

describe('GoToResultsComponent', () => {
  let component: GoToResultsComponent;
  let fixture: ComponentFixture<GoToResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoToResultsComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoToResultsComponent);
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
