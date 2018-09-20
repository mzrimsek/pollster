import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as userActions from './features/auth/actions/user.actions';

import { State } from './reducers/root.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new userActions.AnonymousLogin());
  }

  ngOnDestroy() {
    this.store.dispatch(new userActions.Logout());
  }
}
