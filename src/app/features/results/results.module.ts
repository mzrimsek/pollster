import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResultsViewComponent } from './components/results-view/results-view.component';
import { ResultsComponent } from './results.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ResultsComponent,
    ResultsViewComponent
  ]
})
export class ResultsModule { }
