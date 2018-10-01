import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { combineReducers, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import * as fromAuth from './features/auth/reducers/root.reducer';
import * as fromCreate from './features/create/reducers/root.reducer';
import * as fromPoll from './features/poll/reducers/root.reducer';
import * as fromRoot from './reducers/root.reducer';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers),
          'create': combineReducers(fromCreate.reducers),
          'poll': combineReducers(fromPoll.reducers)
        })
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
