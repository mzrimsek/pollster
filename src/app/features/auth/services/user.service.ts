import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import authComponentSelectors, { State } from '../reducers/root.reducer';

import { User } from '../models';

@Injectable()
export class UserService {

  constructor(private store: Store<State>) { }

  getUser(): Observable<User> {
    return this.store.select(authComponentSelectors.user);
  }
}
