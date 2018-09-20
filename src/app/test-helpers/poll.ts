import { Observable, of } from 'rxjs';

import { FirestorePollItem } from '../shared/services/poll.service';

import { Poll, VotePayload } from '../shared/models';

export namespace poll {
  export class MockPollService {
    savePoll(_poll: Poll): Observable<string> {
      return of('PollId');
    }

    getPoll(_pollId: string): Observable<Poll> {
      return of(testPoll);
    }

    saveVote(_payload: VotePayload): Observable<null> {
      return of(null);
    }
  }

  export const testPoll: Poll = {
    title: 'Lunch',
    options: {
      'Chipotle': 0,
      'Sheetz': 0,
      'Pulp': 0
    },
    selectionMode: 'SINGLE',
    createdAt: 10000,
    createdByName: 'Anonymous',
    createdByUid: 'Some UserId',
    validUntil: null
  };

  export namespace firestore {
    const testPollItem: FirestorePollItem = {
      title: 'Test Poll',
      options: {
        'Option 1': 0,
        'Option 2': 0
      },
      selectionMode: 'SINGLE',
      createdAt: 0,
      createdByName: 'Anonymous',
      createdByUid: 'Some UserId',
      validUntil: null
    };

    export const documentStub = {
      update: jasmine.createSpy('update'),
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(testPollItem))
    };

    export const collectionStub = {
      doc: jasmine.createSpy('doc').and.returnValue(documentStub),
      add: jasmine.createSpy('add').and.returnValue(new Promise((resolve) => {
        resolve({
          id: 'someDocId'
        });
      }))
    };

    export const angularFirestoreStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };
  }
}
