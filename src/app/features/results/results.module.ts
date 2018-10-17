import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatListModule } from '@angular/material';

import { ResultsViewComponent } from './components/results-view/results-view.component';
import { ResultsComponent } from './results.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule
  ],
  declarations: [
    ResultsComponent,
    ResultsViewComponent
  ]
})
export class ResultsModule { }
