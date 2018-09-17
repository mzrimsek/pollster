import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Poll, SelectionMode } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private pollCollection: AngularFirestoreCollection<FirestorePollItem>;
  constructor(private afs: AngularFirestore) {
    this.pollCollection = this.afs.collection<FirestorePollItem>('poll');
  }

  savePoll(poll: Poll): Observable<string> {
    const docId = this.pollCollection.add(poll).then(doc => doc.id);
    return from(docId);
  }

  getPoll(pollId: string): Observable<Poll> {
    const pollDoc = this.pollCollection.doc<FirestorePollItem>(pollId).valueChanges();
    return pollDoc.pipe(map(doc => doc as Poll));
  }
}

export interface FirestorePollItem {
  title: string;
  options: Record<string, number>;
  selectionMode: SelectionMode;
  createdAt: number;
  createdBy: string;
}
