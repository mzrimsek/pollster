import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteComponent } from './components/vote/vote.component';
import { PollComponent } from './poll.component';

describe('PollComponent', () => {
  let component: PollComponent;
  let fixture: ComponentFixture<PollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PollComponent,
        VoteComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
