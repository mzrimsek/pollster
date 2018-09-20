import { Action } from '@ngrx/store';

import { User } from '../models';

export const GET_USER = '[User] Get User';
export class GetUser implements Action {
  readonly type = GET_USER;
  constructor() { }
}

export const AUTHENTICATED = '[User] Authenticated';
export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public user: User) { }
}

export const NOT_AUTHENTICATED = '[User] Not Authenticated';
export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor() { }
}

export const ANONYMOUS_LOGIN = '[User] Anonymous Login Attempt';
export class AnonymousLogin implements Action {
  readonly type = ANONYMOUS_LOGIN;
  constructor() { }
}

export const LOGOUT = '[User] Logout';
export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() { }
}

export type All = GetUser |
  Authenticated |
  NotAuthenticated |
  AnonymousLogin |
  Logout;
