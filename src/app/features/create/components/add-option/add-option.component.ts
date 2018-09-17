import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as actions from '../../actions/create-poll.actions';

import { State } from '../../reducers/root.reducer';

@Component({
  selector: 'app-create-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.scss']
})
export class AddOptionComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() { }

  addOption(optionInputEl: HTMLInputElement) {
    if (optionInputEl.value) {
      this.store.dispatch(new actions.AddOption(optionInputEl.value));
      optionInputEl.value = '';
    }
  }
}
