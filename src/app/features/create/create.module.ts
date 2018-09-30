import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
    MatListModule
} from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';

import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { OptionComponent } from './components/option/option.component';
import { CreateComponent } from './create.component';

import { CreatePollEffects } from './effects/create-poll.effects';

import { PollService } from '../../shared/services/poll.service';
import { UserService } from '../auth/services/user.service';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    StoreModule.forFeature('create', reducers),
    EffectsModule.forFeature([CreatePollEffects])
  ],
  declarations: [CreateComponent, CreatePollComponent, OptionComponent],
  providers: [PollService, UserService],
})
export class CreateModule { }
