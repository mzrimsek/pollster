import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../../app-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
