import { ResultsModule } from './results.module';

describe('ResultsModule', () => {
  let resultsModule: ResultsModule;

  beforeEach(() => {
    resultsModule = new ResultsModule();
  });

  it('Should create an instance', () => {
    expect(resultsModule).toBeTruthy();
  });
});
