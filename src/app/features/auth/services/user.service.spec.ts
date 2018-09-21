import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { UserService } from './user.service';

import * as actions from '../actions/user.actions';

import * as fromRoot from '../../../reducers/root.reducer';
import * as fromAuth from '../reducers/root.reducer';

import { User } from '../models';

describe('User Service', () => {
  let service: UserService;
  let store: Store<fromAuth.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers)
        })
      ],
      providers: [UserService]
    });

    service = TestBed.get(UserService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {
    it('Should return default data when not authenticated', () => {
      const result = service.getUser();
      result.subscribe(res => {
        expect(res).toEqual({
          uid: '',
          displayName: '',
          email: '',
          photoURL: '',
          providerId: ''
        });
      });
    });

    it('Should return the user when authenticated', () => {
      const user: User = {
        uid: 'some id',
        displayName: 'Jim Bob',
        email: 'jimbob@jimbob.com',
        photoURL: 'jimbob.com/jimbob.png',
        providerId: 'google.com'
      };
      store.dispatch(new actions.Authenticated(user));

      const result = service.getUser();
      result.subscribe(res => {
        expect(res).toEqual(user);
      });
    });

    it('Should select user', () => {
      service.getUser();
      expect(store.select).toHaveBeenCalledWith(fromAuth._selectUserData);
    });
  });
});
