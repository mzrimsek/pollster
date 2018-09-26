import { getVotes } from './vote.utils';

describe('Vote Utils', () => {
  describe('getVotes', () => {
    it('Should return list with only new selection when selection mode is "SINGLE"', () => {
      const result = getVotes('Option', [], 'SINGLE');
      expect(result).toEqual(['Option']);
    });

    describe('When selection mode is "MULTI"', () => {
      it('Should add to list if new selection not contained in current selections', () => {
        const result = getVotes('Option', [], 'MULTI');
        expect(result).toEqual(['Option']);
      });

      it('Should remove from list if new selection contained in current selections', () => {
        const result = getVotes('Option', ['Option', 'Another One'], 'MULTI');
        expect(result).toEqual(['Another One']);
      });
    });
  });
});
