import { _selectVoteSucceeded, PollState, State } from './root.reducer';

describe('Poll Root Reducer', () => {
  describe('Vote Selectors', () => {
    describe('_selectVoteSucceeded', () => {
      it('Should return correct value', () => {
        const pollState: PollState = {
          vote: {
            voteSucceeded: false
          }
        };
        const state: State = { poll: pollState };

        const result = _selectVoteSucceeded(state);

        expect(result).toBe(false);
      });
    });
  });
});
