import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as actions from '../../actions/create-poll.actions';

import { State } from '../../reducers/root.reducer';

import { Poll } from '../../../../shared/models';
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

  save() {
    const optionsRecord: Record<string, number> = {};
    this.info.options.forEach((option) => {
      optionsRecord[option.value] = 0;
    });

    const poll: Poll = {
      title: this.info.title,
      selectionMode: this.info.selectionMode,
      validUntil: this.info.validUntil,
      options: optionsRecord,
      createdAt: this.getNowTime(),
      createdBy: 'Anonymous'
    };
    this.store.dispatch(new actions.Save(poll));
  }

  getNowTime(): number {
    return new Date().getTime();
  }
}
