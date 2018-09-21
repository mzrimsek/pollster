import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';

import { VoteInfoEntity } from '../reducers/vote.reducer';

import { VotePayload } from '../../../shared/models';
import { VoteInfo } from '../models';

@Injectable()
export class VoteService {

  private voteCollection: AngularFirestoreCollection<VoteCollection>;
  constructor(private afs: AngularFirestore) {
    this.voteCollection = this.afs.collection<VoteCollection>('vote');
  }

  trackVote(payload: VotePayload, votedOn = new Date().getTime()): Observable<VoteInfo> {
    const newItem: FirestoreVoteItem = {
      pollId: payload.pollId,
      option: payload.option,
      votedOn
    };
    this.getUserVoteCollection(payload.userId).doc(payload.pollId).set(newItem);
    return of(newItem);
  }

  getVotesForUser(userId: string): Observable<VoteInfoEntity[]> {
    return this.getUserVoteCollection(userId).valueChanges();
  }

  private getUserVoteCollection(userId: string): AngularFirestoreCollection<FirestoreVoteItem> {
    return this.voteCollection.doc(userId).collection('votes');
  }
}

export interface FirestoreVoteItem {
  pollId: string;
  option: string;
  votedOn: number;
}

interface VoteCollection {
  votes: FirestoreVoteItem[];
}
