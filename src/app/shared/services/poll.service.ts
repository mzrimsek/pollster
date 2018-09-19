import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { from, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { Poll, SelectionMode, VotePayload } from '../models';

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

  saveVote(payload: VotePayload): Observable<null> {
    const poll$ = this.getPoll(payload.pollId).pipe(first());
    poll$.subscribe(poll => {
      const options = {
        ...poll.options,
        [payload.option]: poll.options[payload.option] + 1
      };
      this.pollCollection.doc(payload.pollId).update({ options });
    });
    return of(null);
  }
}

export interface FirestorePollItem {
  title: string;
  options: Record<string, number>;
  selectionMode: SelectionMode;
  createdAt: number;
  createdBy: string;
  validUntil: number | null;
}
