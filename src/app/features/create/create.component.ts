import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import createSelectors, { State } from './reducers/root.reducer';

import { CreatePollInfo } from './models';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createPollInfo$: Observable<CreatePollInfo>;
  pollHasEnd$: Observable<boolean>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.createPollInfo$ = this.store.select(createSelectors.createPollInfo);
    this.pollHasEnd$ = this.store.select(createSelectors.pollHasEnd);
  }
}
