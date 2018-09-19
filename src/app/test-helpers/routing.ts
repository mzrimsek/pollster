import { of } from 'rxjs';

export namespace routing {
  export const activatedRouteStub = {
    snapshot: {
      queryParams: {
        returnUrl: ''
      }
    },
    params: of({
      pollId: 'Some PollId'
    })
  };
}
