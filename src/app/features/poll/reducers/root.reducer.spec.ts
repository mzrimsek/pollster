import { _selectVoteInfo, PollState, State } from './root.reducer';

describe('Poll Root Reducer', () => {
  describe('Vote Selectors', () => {
    describe('_selectVoteInfo', () => {
      it('Should return dictionary of items', () => {
        const pollState: PollState = {
          vote: {
            ids: ['abcde'],
            entities: {
              'abcde': {
                pollId: 'abcde',
                option: 'some option',
                votedOn: 10000
              }
            }
          }
        };
        const state: State = { poll: pollState };

        const result = _selectVoteInfo(state);

        expect(result).toEqual({
          'abcde': {
            pollId: 'abcde',
            option: 'some option',
            votedOn: 10000
          }
        });
      });
    });
  });
});
