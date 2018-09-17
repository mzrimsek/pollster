import { Component, OnInit } from '@angular/core';

import { PollService } from '../../shared/services/poll.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  options: string[] = [];
  constructor(private pollService: PollService) { }

  ngOnInit() { }

  addOption(option: string) {
    this.options.push(option);
  }
}
