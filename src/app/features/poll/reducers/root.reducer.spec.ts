import { _selectVoteInfoEntities, _selectVoteOption, PollState, State } from './root.reducer';

describe('Poll Root Reducer', () => {
  describe('Vote Info Selectors', () => {
    describe('_selectVoteInfoEntities', () => {
      it('Should return dictionary of items', () => {
        const pollState: PollState = {
          voteInfo: {
            ids: ['abcde'],
            entities: {
              'abcde': {
                pollId: 'abcde',
                option: 'some option',
                votedOn: 10000
              }
            }
          },
          vote: {
            options: ''
          }
        };
        const state: State = { poll: pollState };

        const result = _selectVoteInfoEntities(state);

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

  describe('Vote Selectors', () => {
    describe('_selectVoteOption', () => {
      it('Should return vote option', () => {
        const pollState: PollState = {
          voteInfo: {
            ids: [],
            entities: {}
          },
          vote: {
            options: 'Option'
          }
        };
        const state: State = { poll: pollState };

        const result = _selectVoteOption(state);

        expect(result).toBe('Option');
      });
    });
  });
});
