import { _selectCreatePollInfo, _selectPollHasEnd, CreateState, State } from './root.reducer';

describe('Create Root Reducer', () => {
  describe('Create Poll Selectors', () => {
    describe('_selectCreatePollInfo', () => {
      it('Should return correct createPollInfo', () => {
        const createState: CreateState = {
          createPoll: {
            title: 'Some Title',
            selectionMode: 'SINGLE',
            validUntil: null,
            hasEnd: false,
            ids: [1],
            entities: {
              1: {
                id: 1,
                value: 'Some Option'
              }
            }
          }
        };
        const state: State = { create: createState };

        const result = _selectCreatePollInfo(state);

        expect(result).toEqual({
          title: 'Some Title',
          selectionMode: 'SINGLE',
          validUntil: null,
          options: [{
            id: 1,
            value: 'Some Option'
          }]
        });
      });
    });

    describe('_selectPollHasEnd', () => {
      it('Should return hasEnd', () => {
        const createState: CreateState = {
          createPoll: {
            title: 'Some Title',
            selectionMode: 'SINGLE',
            validUntil: 100000,
            hasEnd: true,
            ids: [1],
            entities: {
              1: {
                id: 1,
                value: 'Some Option'
              }
            }
          }
        };
        const state: State = { create: createState };

        const result = _selectPollHasEnd(state);

        expect(result).toBe(true);
      });
    });
  });
});
