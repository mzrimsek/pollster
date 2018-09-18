import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as actions from '../../actions/create-poll.actions';

import { State } from '../../reducers/root.reducer';

import { CreatePollInfo } from '../../models';

@Component({
  selector: 'app-create-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePollComponent implements OnInit {

  @Input() info: CreatePollInfo;
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  setTitle(titleEl: HTMLInputElement) {
    if (titleEl.value) {
      this.store.dispatch(new actions.SetTitle(titleEl.value));
    }
  }

  addOption(addOptionEl: HTMLInputElement) {
    if (addOptionEl.value) {
      this.store.dispatch(new actions.AddOption(addOptionEl.value));
      addOptionEl.value = '';
    }
  }

  removeOption(optionId: number) {
    this.store.dispatch(new actions.RemoveOption(optionId));
  }
}
