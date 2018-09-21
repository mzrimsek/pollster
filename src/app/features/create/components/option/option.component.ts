import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as actions from '../../actions/create-poll.actions';

import { State } from '../../reducers/root.reducer';

import { Option } from '../../models';

@Component({
  selector: 'app-create-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent implements OnInit {

  @Input() option: Option;
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  removeOption() {
    this.store.dispatch(new actions.RemoveOption(this.option.id));
  }
}
