export type SubStatus = 'SUCCESS' | 'RUNNING';
export type Status = 'PENDING' | 'ERROR ' | 'KILLED ' | SubStatus;
export type Payload<T> = { data: T };
export type Result<T> = Payload<T> & { status: Status };
export type Job<T> = (param: Payload<T>) => Result<T>;

export type JobRunnerParams<T> = {
  fn: Job<T>;
};
