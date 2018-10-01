import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OptionsPipe } from './pipes/options.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OptionsPipe],
  exports: [OptionsPipe]
})
export class SharedModule { }
