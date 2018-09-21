import { getOptionsFrom } from './option.utils';

import { poll } from '../../test-helpers';

describe('Option Utils', () => {
  describe('getOptionsFrom', () => {
    it('Should return list of option names', () => {
      const results = getOptionsFrom(poll.testPoll);
      expect(results).toEqual(['Chipotle', 'Sheetz', 'Pulp']);
    });
  });
});
