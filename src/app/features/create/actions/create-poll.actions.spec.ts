import * as actions from './create-poll.actions';

import { poll } from '../../../test-helpers';

describe('Create Poll Actions', () => {
  describe('SetTitle', () => {
    it('Should have correct type', () => {
      const action = new actions.SetTitle('');
      expect(action.type).toBe(actions.SET_TITLE);
    });

    it('Should have correct title', () => {
      const action = new actions.SetTitle('Some Title');
      expect(action.title).toBe('Some Title');
    });
  });

  describe('AddOption', () => {
    it('Should have correct type', () => {
      const action = new actions.AddOption(0, '');
      expect(action.type).toBe(actions.ADD_OPTION);
    });

    it('Should have correct id', () => {
      const action = new actions.AddOption(12, '');
      expect(action.id).toBe(12);
    });

    it('Should have correct option', () => {
      const action = new actions.AddOption(0, 'Some Option');
      expect(action.option).toBe('Some Option');
    });
  });

  describe('RemoveOption', () => {
    it('Should have correct type', () => {
      const action = new actions.RemoveOption(0);
      expect(action.type).toBe(actions.REMOVE_OPTION);
    });

    it('Should have correct optionId', () => {
      const action = new actions.RemoveOption(123);
      expect(action.optionId).toBe(123);
    });
  });

  describe('SetMode', () => {
    it('Should have correct type', () => {
      const action = new actions.SetMode('SINGLE');
      expect(action.type).toBe(actions.SET_MODE);
    });

    it('Should have correct mode', () => {
      const action = new actions.SetMode('MULTI');
      expect(action.mode).toBe('MULTI');
    });
  });

  describe('SetValidUntil', () => {
    it('Should have correct type', () => {
      const action = new actions.SetValidUntil(null);
      expect(action.type).toBe(actions.SET_VALID_UNTIL);
    });

    it('Should have correct time', () => {
      const action = new actions.SetValidUntil(10000);
      expect(action.time).toBe(10000);
    });
  });

  describe('Save', () => {
    it('Should have correct type', () => {
      const action = new actions.Save(poll.testPoll);
      expect(action.type).toBe(actions.SAVE);
    });

    it('Should have correct poll', () => {
      const action = new actions.Save(poll.testPoll);
      expect(action.poll).toEqual({
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
      });
    });
  });

  describe('Clear', () => {
    it('Should have correct type', () => {
      const action = new actions.Clear();
      expect(action.type).toBe(actions.CLEAR);
    });
  });

  describe('SetHasEnd', () => {
    it('Should have correct type', () => {
      const action = new actions.SetHasEnd(false);
      expect(action.type).toBe(actions.SET_HAS_END);
    });

    it('Should have correct hasEnd', () => {
      const action = new actions.SetHasEnd(true);
      expect(action.hasEnd).toBe(true);
    });
  });
});
