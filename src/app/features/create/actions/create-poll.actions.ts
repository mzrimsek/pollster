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
  constructor(public id: number, public option: string) { }
}

export const REMOVE_OPTION = '[Create Poll] Remove Option';
export class RemoveOption implements Action {
  readonly type = REMOVE_OPTION;
  constructor(public optionId: number) { }
}

export const SET_MODE = '[Create Poll] Set Mode';
export class SetMode implements Action {
  readonly type = SET_MODE;
  constructor(public mode: SelectionMode) { }
}

export const SET_VALID_UNTIL = '[Create Poll] Set Valid Until';
export class SetValidUntil implements Action {
  readonly type = SET_VALID_UNTIL;
  constructor(public time: number | null) { }
}

export const SAVE = '[Create Poll] Save';
export class Save implements Action {
  readonly type = SAVE;
  constructor(public poll: Poll) { }
}

export const CLEAR = '[Create Poll] Clear';
export class Clear implements Action {
  readonly type = CLEAR;
  constructor() { }
}

export const SET_HAS_END = '[Create Poll] Set Has End';
export class SetHasEnd implements Action {
  readonly type = SET_HAS_END;
  constructor(public hasEnd: boolean) { }
}

export type All = SetTitle |
  AddOption |
  RemoveOption |
  SetMode |
  SetValidUntil |
  Save |
  Clear |
  SetHasEnd;
