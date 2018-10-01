import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

import * as actions from '../../actions/create-poll.actions';

import { State } from '../../reducers/root.reducer';

import { Poll, SelectionMode } from '../../../../shared/models';
import { User } from '../../../auth/models';
import { CreatePollInfo } from '../../models';

@Component({
  selector: 'app-create-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePollComponent implements OnInit {

  @Input() info: CreatePollInfo;
  private optionId = 1;
  private user: User;
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user = user);
  }

  setTitle(titleEl: HTMLInputElement) {
    if (titleEl.value) {
      this.store.dispatch(new actions.SetTitle(titleEl.value));
    }
  }

  addOption(addOptionEl: HTMLInputElement) {
    const existingValue = this.info.options.find(x => x.value === addOptionEl.value);
    if (!existingValue && addOptionEl.value) {
      this.store.dispatch(new actions.AddOption(this.optionId++, addOptionEl.value));
      addOptionEl.value = '';
      addOptionEl.focus();
    }
  }

  setSelectionMode(selectionModeEl: HTMLInputElement) {
    const selectionMode: SelectionMode = selectionModeEl.checked ? 'MULTI' : 'SINGLE';
    this.store.dispatch(new actions.SetMode(selectionMode));
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
      createdByName: this.user.displayName ? this.user.displayName : 'Anonymous',
      createdByUid: this.user.uid
    };
    this.store.dispatch(new actions.Save(poll));
  }

  reset() {
    this.store.dispatch(new actions.Clear());
  }

  getNowTime(): number {
    return new Date().getTime();
  }
}
