import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { VotePayload } from '../../../shared/models';
import { VoteInfo } from '../models';

@Injectable()
export class VoteService {

  private voteCollection: AngularFirestoreCollection<VoteCollection>;
  constructor(private afs: AngularFirestore) {
    this.voteCollection = this.afs.collection<VoteCollection>('vote');
  }

  trackVote(payload: VotePayload): Observable<VoteInfo> {
    const newItem: FirestoreVoteItem = {
      option: payload.option,
      votedOn: new Date().getTime()
    };
    this.getUserVoteCollection(payload.userId).doc(payload.pollId).set(newItem);
    return of(newItem);
  }

  getVoteForPoll(userId: string, pollId: string): Observable<VoteInfo> {
    return this.getUserVoteCollection(userId).doc<FirestoreVoteItem>(pollId).valueChanges()
      .pipe(map(docItem => docItem as VoteInfo));
  }

  private getUserVoteCollection(userId: string): AngularFirestoreCollection<FirestoreVoteItem> {
    return this.voteCollection.doc(userId).collection('votes');
  }
}

export interface FirestoreVoteItem {
  option: string;
  votedOn: number;
}

interface VoteCollection {
  votes: FirestoreVoteItem[];
}
