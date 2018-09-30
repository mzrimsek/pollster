import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';

import { OptionSelectedEvent } from '../../models';

@Component({
  selector: 'app-poll-single-option',
  templateUrl: './single-option.component.html',
  styleUrls: ['./single-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleOptionComponent implements OnInit {

  @Input() options: string[] = [];
  @Output() optionSelected: EventEmitter<OptionSelectedEvent> = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  emitOptionSelected(option: string) {
    const event: OptionSelectedEvent = { option };
    this.optionSelected.emit(event);
  }
}
