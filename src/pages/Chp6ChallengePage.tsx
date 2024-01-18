import { useEffect } from 'react';
import { chp6Challenge } from '../workers';
import { useWorker } from '../hooks/useWorker';
import { workerDeps, BufferedCanvas } from '../model';
import { Canvas } from '../components/Canvas';
const width = 500;
const height = 500;

export const Chp6ChallengePage = () => {
  const [data, controller] = useWorker<BufferedCanvas>(
    chp6Challenge,
    workerDeps
  );

  const { startWorker, stopWorker } = controller;

  useEffect(() => {
    const pixelCount = width * height;
    const elementCount = pixelCount * 4;

    const sharedArrayBuffer = new SharedArrayBuffer(
      Uint8ClampedArray.BYTES_PER_ELEMENT * elementCount
    );
    const uint8View = new Uint8ClampedArray(sharedArrayBuffer).fill(0);

    startWorker({ data: { width, height, buffer: uint8View } });
    return () => stopWorker();
  }, []);

  return <Canvas width={width} height={height} canvas={data} />;
};
