import * as core from '@actions/core';
import * as github from '@actions/github';
import * as tmp from 'tmp';
import execa from 'execa';

import {CheckRunner} from './check';
import * as input from './input';
import { checkPassed } from './check-passed';

/**
 * These environment variables are exposed for GitHub Actions.
 *
 * See https://bit.ly/2WlFUD7 for more information.
 */
const {GITHUB_TOKEN, GITHUB_WORKSPACE} = process.env;

export async function run(actionInput: input.Input): Promise<void> {
  try {
    const startedAt = new Date().toISOString();
    const alertResp = await execa('vale', actionInput.args);

    const runner = new CheckRunner(actionInput.files);

    const sha = github.context.payload.pull_request
      ? github.context.payload.pull_request.head.sha
      : github.context.sha;

    runner.makeAnnotations(alertResp.stdout);
    await runner.executeCheck({
      token: actionInput.token,
      name: 'Vale',
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      head_sha: sha,
      started_at: startedAt,
      context: {vale: actionInput.version}
    });

    const passCondition = core.getInput('passCondition');
    const result = runner.getCheckResult();

    if (!checkPassed(result, passCondition)) {
      core.setFailed(
        `Pass condition was not satisfied: ${passCondition}`
      );
    }
  } catch (error) {
    core.setFailed(error.stderr);
  }
}

async function main(): Promise<void> {
  try {
    const userToken = GITHUB_TOKEN as string;
    const workspace = GITHUB_WORKSPACE as string;

    const tmpFile = tmp.fileSync({postfix: '.ini', dir: workspace});
    const actionInput = await input.get(tmpFile, userToken, workspace);

    await run(actionInput);

    tmpFile.removeCallback();
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
