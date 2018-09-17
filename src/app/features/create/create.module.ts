import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CreateComponent } from './create.component';

import { PollService } from '../../shared/services/poll.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [CreateComponent],
  providers: [PollService]
})
export class CreateModule { }
