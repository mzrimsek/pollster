import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatListModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ResultsViewComponent } from './components/results-view/results-view.component';
import { ResultsComponent } from './results.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    MatCardModule,
    MatListModule
  ],
  declarations: [
    ResultsComponent,
    ResultsViewComponent
  ]
})
export class ResultsModule { }
