import { Action } from '@ngrx/store';

import { Poll, SelectionMode } from '../../../shared/models';

export const SET_TITLE = '[Create Poll] Set Title';
export class SetTitle implements Action {
  readonly type = SET_TITLE;
  constructor(public title: string) { }
}

export const ADD_OPTION = '[Create Poll] Add Option';
export class AddOption implements Action {
  readonly type = ADD_OPTION;
  constructor(public option: string) { }
}

export const SET_MODE = '[Create Poll] Set Mode';
export class SetMode implements Action {
  readonly type = SET_MODE;
  constructor(public mode: SelectionMode) { }
}

export const SAVE = '[Create Poll] Save';
export class Save implements Action {
  readonly type = SAVE;
  constructor(public poll: Poll) { }
}

export const SAVE_SUCCEEDED = '[Create Poll] Save Succeeded';
export class SaveSucceeded implements Action {
  readonly type = SAVE_SUCCEEDED;
  constructor(public pollId: string) { }
}

export const CLEAR = '[Create Poll] Clear';
export class Clear implements Action {
  readonly type = CLEAR;
  constructor() { }
}

export type All = SetTitle |
  AddOption |
  SetMode |
  Save |
  SaveSucceeded |
  Clear;
