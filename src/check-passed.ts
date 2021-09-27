import {Stats} from './check';

export function checkPassed(result: Stats, passCondition: string): boolean {
  const maxErrors = /errors < (\d+)/.exec(passCondition)?.[1] ?? Infinity;
  const maxWarnings = /warnings < (\d+)/.exec(passCondition)?.[1] ?? Infinity;
  const maxSuggestions =
    /suggestions < (\d+)/.exec(passCondition)?.[1] ?? Infinity;

  return (
    result.errors < maxErrors &&
    result.warnings < maxWarnings &&
    result.suggestions < maxSuggestions
  );
}
