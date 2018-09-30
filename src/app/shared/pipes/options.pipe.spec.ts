import { OptionsPipe } from './options.pipe';

describe('OptionsPipe', () => {
  let pipe: OptionsPipe;

  beforeEach(() => {
    pipe = new OptionsPipe();
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Transform', () => {
    it('Should return option when length is one', () => {
      const options = ['Option 1'];
      const results = pipe.transform(options);
      expect(results).toBe('Option 1');
    });

    it('Should return list of options when length is more than one', () => {
      const options = ['Option 1', 'Option 2'];
      const results = pipe.transform(options);
      expect(results).toBe('Option 1, Option 2');
    });
  });
});
