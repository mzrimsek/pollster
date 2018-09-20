import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { of } from 'rxjs';

import { VotePayload } from '../models';

@Injectable()
export class VoteService {

  private voteCollection: AngularFirestoreCollection<VoteCollection>;
  constructor(private afs: AngularFirestore) {
    this.voteCollection = this.afs.collection<VoteCollection>('vote');
  }

  trackVote(payload: VotePayload) {
    const newItem: FirestoreVoteItem = {
      option: payload.option,
      votedOn: new Date().getTime()
    };
    this.getUserVoteCollection(payload.userId).doc(payload.pollId).set(newItem);
    return of(null);
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
