import { Observable, of } from 'rxjs';

import { VoteInfo } from '../features/poll/models';
import { VotePayload } from '../shared/models';


export namespace vote {
  export const testPayload: VotePayload = {
    userId: 'Some UserId',
    pollId: 'Some PollId',
    option: 'Some Option'
  };

  export const testVoteInfo: VoteInfo = {
    pollId: 'Some PollId',
    option: 'Some Option',
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
}
