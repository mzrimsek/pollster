import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatListModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { ResultsViewComponent } from './components/results-view/results-view.component';
import { ResultsComponent } from './results.component';

import { PollService } from '../../shared/services/poll.service';

import { poll, routing } from '../../test-helpers';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let service: PollService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsComponent,
        ResultsViewComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: routing.activatedRouteStub },
        { provide: PollService, useClass: poll.MockPollService }
      ],
      imports: [
        MatCardModule,
        MatListModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PollService);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  xit('Should call pollService getPoll with pollId from route params', () => {
    spyOn(service, 'getPoll');
    expect(service.getPoll).toHaveBeenCalledWith('Some PollId');
  });
});
