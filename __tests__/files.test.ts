import {allFiles} from '../src/files';

describe('Files', () => {
  it('test', async () => {
    const excludePattern = `
    README.MD
    LICENCE`;
    const test = await allFiles(excludePattern);

    expect(test).not.toBeNull();
  });
});
