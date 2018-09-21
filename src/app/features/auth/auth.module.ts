import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { InitEffects } from './effects/init.effects';
import { UserEffects } from './effects/user.effects';

import { AuthService } from './services/auth.service';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([UserEffects, InitEffects])
  ],
  declarations: [],
  providers: [AuthService]
})
export class AuthModule { }
