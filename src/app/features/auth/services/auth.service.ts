import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { from, Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  getAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  signInAnonymously(): Observable<any> {
    return from(this.afAuth.auth.signInAnonymously());
  }

  signOut(): Observable<any> {
    return from(this.afAuth.auth.signOut());
  }
}
