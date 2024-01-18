import { useState, useRef, useCallback, useEffect } from 'react';
import { Payload, Status, SubStatus, Job } from '../model';
import { createWorker, DepList } from './createWorker';

type WorkerController<T> = {
  startWorker: (fnArgs: { data: T }, transferable?: Transferable[]) => void;
  stopWorker: () => void;
  status: Status;
};

export const useWorker = <T>(fn: Job<T>, localDependencies: DepList) => {
  const [workerStatus, setWorkerStatus] = useState<Status>('PENDING');
  const [data, setData] = useState<T | null>(null);
  const worker = useRef<Worker & { _url?: string }>();
  const isRunning = useRef(false);

  const killWorker = useCallback(() => {
    console.log('**** attempting to kill worker ****');
    if (worker.current?._url) {
      worker.current.terminate();
      URL.revokeObjectURL(worker.current._url);
      worker.current = undefined;
    }
  }, []);

  const onWorkerEnd = useCallback(
    (status: Status) => {
      killWorker();
      setWorkerStatus(status);
    },
    [killWorker, setWorkerStatus]
  );

  const generateWorker = useCallback(() => {
    const newWorker = createWorker(fn, localDependencies);

    type ResultHandler<T> = Record<SubStatus, (params: Payload<T>) => void>;
    const handleResult: ResultHandler<T> = {
      RUNNING: params => setData(params.data),
      SUCCESS: params => setData(params.data)
    };

    newWorker.onmessage = (
      message: MessageEvent<Payload<T> & { status: SubStatus }>
    ) => {
      //messages from worker arrive here
      handleResult[message.data.status]({ data: message.data.data });
    };

    newWorker.onerror = (error: ErrorEvent) => {
      console.log(`<<<<worker failed with: ${JSON.stringify(error)}>>>>`);
      onWorkerEnd('ERROR ');
    };

    return newWorker;
  }, [fn, killWorker]);

  const callWorker = useCallback(
    (workerArgs: { data: T }, transferable?: Transferable[]) => {
      transferable
        ? worker.current?.postMessage(workerArgs, transferable)
        : worker.current?.postMessage(workerArgs);
      setWorkerStatus('RUNNING');
    },
    [setWorkerStatus]
  );

  const startWorker = useCallback(
    (fnArgs: { data: T }, transferable?: Transferable[]) => {
      if (isRunning.current) return;
      if (worker.current) return;

      worker.current = generateWorker();
      return callWorker(fnArgs, transferable);
    },
    [generateWorker, callWorker]
  );

  const stopWorker = useCallback(() => {
    killWorker();
    setWorkerStatus('KILLED ');
  }, [killWorker, setWorkerStatus]);

  const workerController = {
    status: workerStatus,
    startWorker,
    stopWorker
  };

  useEffect(() => {
    isRunning.current = workerStatus === 'RUNNING';
  }, [workerStatus]);

  useEffect(
    () => () => {
      killWorker();
    },
    [killWorker]
  );

  return [data, workerController] as [T | null, WorkerController<T>];
};
