import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';

import { OptionComponent } from './components/option/option.component';
import { ResultsComponent } from './components/results/results.component';
import { VoteComponent } from './components/vote/vote.component';
import { PollComponent } from './poll.component';

import { VoteEffects } from './effects/vote.effects';

import { PollService } from '../../shared/services/poll.service';
import { VoteService } from './services/vote.service';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('poll', reducers),
    EffectsModule.forFeature([VoteEffects])
  ],
  declarations: [PollComponent, VoteComponent, ResultsComponent, OptionComponent],
  providers: [PollService, VoteService]
})
export class PollModule { }
