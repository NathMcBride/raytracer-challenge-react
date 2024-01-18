import { createContext } from 'isoworker';
import { Job } from '../model';

import { JobRunner } from './jobRunner';
import { DepList } from './createWorker';

const createBlobString = <T>(
  jobRunner: JobRunner,
  fn: Job<T>,
  localDeps: DepList
): string => {
  const [context] = createContext(localDeps);
  const blobCode = `
  ${context}
  onmessage = function(event) {
    onmessage = (${jobRunner})({
      fn: (${fn})
    })
  }
`;
  return blobCode;
};

export const createBlob = <T>(
  jobRunner: JobRunner,
  fn: Job<T>,
  localDeps: DepList
): Blob => {
  const blobCode = createBlobString(jobRunner, fn, localDeps);
  const blob = new Blob([blobCode], { type: 'text/javascript' });
  blob.text().then(d => {
    console.log(`<<< the blob body\n **${d}**\n>>>`);
  });

  return blob;
};
