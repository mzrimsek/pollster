import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { AlreadyVotedComponent } from './already-voted.component';

import { OptionsPipe } from '../../../../shared/pipes/options.pipe';

describe('AlreadyVotedComponent', () => {
  let component: AlreadyVotedComponent;
  let fixture: ComponentFixture<AlreadyVotedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlreadyVotedComponent,
        OptionsPipe
      ],
      imports: [
        RouterTestingModule,
        MatCardModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyVotedComponent);
    component = fixture.componentInstance;

    component.voteInfo = {
      pollId: 'someId',
      options: ['some option'],
      votedOn: 10000
    };

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
