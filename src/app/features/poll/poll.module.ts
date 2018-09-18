import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PollComponent } from './poll.component';
import { VoteComponent } from './components/vote/vote.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PollComponent, VoteComponent, ResultsComponent]
})
export class PollModule { }
