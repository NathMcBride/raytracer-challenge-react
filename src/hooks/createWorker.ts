import { Job } from '../model';

import { jobRunner } from './jobRunner';
import { createBlob } from './createBlob';
export type DepList = () => unknown[];

export const createWorker = <T>(fn: Job<T>, localDeps: DepList) => {
  const initMessage: unknown[] = [];

  const blob = createBlob(jobRunner, fn, localDeps);
  const url = URL.createObjectURL(blob);
  const worker: Worker & { _url?: string } = new Worker(url);
  worker._url = url;
  worker.postMessage(initMessage);

  return worker;
};
