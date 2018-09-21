import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyVotedComponent } from './already-voted.component';

describe('AlreadyVotedComponent', () => {
  let component: AlreadyVotedComponent;
  let fixture: ComponentFixture<AlreadyVotedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadyVotedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyVotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
