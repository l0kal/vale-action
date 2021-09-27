import {checkPassed} from '../src/check-passed';

describe('checkPassed', () => {
  it('passes if passCondition is empty string', () => {
    expect(checkPassed({errors: 1, warnings: 1, suggestions: 1}, '')).toBe(
      true
    );
  });

  it.each([
    [{errors: 3, warnings: 0, suggestions: 0}, 'errors < 5'],
    [
      {errors: 0, warnings: 4, suggestions: 69},
      'warnings < 5; suggestions < 100;'
    ],
    [
      {errors: 4, warnings: 9, suggestions: 99},
      'errors < 5; warnings < 10; suggestions < 100;'
    ]
  ])('passes if passCondition is satisfied', (result, passCondition) => {
    expect(checkPassed(result, passCondition)).toBe(true);
  });

  it.each([
    [{errors: 3, warnings: 0, suggestions: 0}, 'errors < 1'],
    [
      {errors: 0, warnings: 7, suggestions: 13},
      'warnings < 2; suggestions < 20;'
    ],
    [
      {errors: 2, warnings: 1, suggestions: 0},
      'errors < 1; warnings < 5; suggestions < 10;'
    ]
  ])('fails if passCondition is not satisfied', (result, passCondition) => {
    expect(checkPassed(result, passCondition)).toBe(false);
  });
});
