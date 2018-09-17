import { getUUID } from './uuid.utils';

describe('UUID Utils', () => {
  it('Can generate 1,000,000 unique IDs for a user', () => {
    const ids = generateUUIDs(1000000);

    const result = getUUID();

    expect(ids.indexOf(result)).toBe(-1);
  });
});

const generateUUIDs = (amountToGenerate: number): string[] => {
  const ids: number[] = new Array(amountToGenerate);
  return ids.map(i => getUUID(i));
};
