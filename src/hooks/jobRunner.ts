import { JobRunnerParams, Payload } from '../model';

export type JobRunner = <T>(
  params: JobRunnerParams<T>
) => (e: MessageEvent<Payload<T>>) => void;

export const jobRunner: JobRunner =
  <T>(params: JobRunnerParams<T>) =>
  (e: MessageEvent<Payload<T>>) => {
    //message received by worker from main thread
    const { data, status } = params.fn(e.data);
    postMessage({ data, status });
  };
