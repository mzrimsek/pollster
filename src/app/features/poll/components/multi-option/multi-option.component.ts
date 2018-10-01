import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';

import { OptionSelectedEvent } from '../../models';

@Component({
  selector: 'app-poll-multi-option',
  templateUrl: './multi-option.component.html',
  styleUrls: ['./multi-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiOptionComponent implements OnInit {

  @Input() options: string[] = [];
  @Output() optionSelected: EventEmitter<OptionSelectedEvent> = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  emitOptionSelected(option: string) {
    const event: OptionSelectedEvent = { option };
    this.optionSelected.emit(event);
  }
}
