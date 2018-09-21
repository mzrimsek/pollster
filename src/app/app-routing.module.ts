import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './features/create/create.component';
import { HomeComponent } from './features/home/home.component';
import { PollComponent } from './features/poll/poll.component';
import { ResultsComponent } from './features/results/results.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'poll/:pollId',
    component: PollComponent
  },
  {
    path: 'results/:pollId',
    component: ResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
