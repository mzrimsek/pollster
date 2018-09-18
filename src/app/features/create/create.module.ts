import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';

import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { CreateComponent } from './create.component';

import { PollService } from '../../shared/services/poll.service';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('create', reducers),
    EffectsModule.forFeature([])
  ],
  declarations: [CreateComponent, CreatePollComponent],
  providers: [PollService],
})
export class CreateModule { }
