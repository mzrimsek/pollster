import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', {}),
    EffectsModule.forFeature([])
  ],
  declarations: [],
  providers: [AuthService]
})
export class AuthModule { }
