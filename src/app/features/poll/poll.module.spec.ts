import { PollModule } from './poll.module';

describe('PollModule', () => {
  let pollModule: PollModule;

  beforeEach(() => {
    pollModule = new PollModule();
  });

  it('Should create an instance', () => {
    expect(pollModule).toBeTruthy();
  });
});
