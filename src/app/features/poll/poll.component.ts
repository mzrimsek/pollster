import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { PollService } from '../../shared/services/poll.service';

import { Poll } from '../../shared/models';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  poll$: Observable<Poll>;
  constructor(private route: ActivatedRoute, private pollService: PollService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const pollId = params.pollId;
      this.poll$ = this.pollService.getPoll(pollId);
    });
  }
}
