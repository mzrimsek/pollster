import { Observable, of } from 'rxjs';

import { Poll, VotePayload } from '../shared/models';

export class MockPollService {
  savePoll(_poll: Poll): Observable<string> {
    return of('PollId');
  }

  saveVote(_payload: VotePayload): Observable<null> {
    return of(null);
  }
}
