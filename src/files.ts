import fs from 'fs';
import gitRootDir from 'git-root-dir';
import path from 'path';

export async function allFiles(
  excludePattern: string
): Promise<string[] | undefined> {
  const gitRoot = await gitRootDir();

  if (!gitRoot) {
    return;
  }

  let files: string[] = [];

  GetFiles(gitRoot, files);

  return files;
}

function GetFiles(directory: string, files: string[]) {
  const filesInDirectory = fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
      GetFiles(absolute, files);
    } else {
      files.push(absolute);
    }
  }
}
