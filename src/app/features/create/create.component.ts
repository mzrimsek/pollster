import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import createSelectors, { State } from './reducers/root.reducer';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  options: Observable<string[]>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.options = this.store.select(createSelectors.options);
  }
}
