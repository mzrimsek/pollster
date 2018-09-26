import { Observable, of } from 'rxjs';

import { FirestoreVoteItem } from '../features/poll/services/vote.service';

import { VoteInfo } from '../features/poll/models';
import { VotePayload } from '../shared/models';

export namespace vote {
  export const testPayload: VotePayload = {
    userId: 'Some UserId',
    pollId: 'Some PollId',
    options: 'Chipotle'
  };

  export const testVoteInfo: VoteInfo = {
    pollId: 'Some PollId',
    option: 'Chipotle',
    votedOn: 10000
  };

  export class MockVoteService {
    trackVote(_payload: VotePayload): Observable<VoteInfo> {
      return of(testVoteInfo);
    }

    getVotesForUser(_userId: string): Observable<VoteInfo[]> {
      return of([testVoteInfo]);
    }
  }

  export namespace firestore {
    export const testVoteItems: FirestoreVoteItem[] = [];

    export const itemDocumentStub = {
      set: jasmine.createSpy('set')
    };

    export const itemsCollectionStub = {
      doc: jasmine.createSpy('doc').and.returnValue(itemDocumentStub),
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(testVoteItems))
    };

    export const documentStub = {
      collection: jasmine.createSpy('collection').and.returnValue(itemsCollectionStub)
    };

    export const collectionStub = {
      doc: jasmine.createSpy('doc').and.returnValue(documentStub)
    };

    export const angularFirestoreStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };
  }
}
