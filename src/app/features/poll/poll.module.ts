import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatListModule, MatRadioModule
} from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { AlreadyVotedComponent } from './components/already-voted/already-voted.component';
import { MultiOptionComponent } from './components/multi-option/multi-option.component';
import { SingleOptionComponent } from './components/single-option/single-option.component';
import { VoteComponent } from './components/vote/vote.component';
import { PollComponent } from './poll.component';

import { VoteInfoEffects } from './effects/vote-info.effects';
import { VoteEffects } from './effects/vote.effects';

import { PollService } from '../../shared/services/poll.service';
import { VoteService } from './services/vote.service';

import { OptionsPipe } from '../../shared/pipes/options.pipe';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    StoreModule.forFeature('poll', reducers),
    EffectsModule.forFeature([VoteEffects, VoteInfoEffects])
  ],
  declarations: [
    PollComponent,
    VoteComponent,
    AlreadyVotedComponent,
    SingleOptionComponent,
    MultiOptionComponent
  ],
  providers: [
    PollService,
    VoteService,
    OptionsPipe
  ]
})
export class PollModule { }
