import { useEffect } from 'react';
import { chp7Challenge, Scene } from '../workers';
import { useWorker } from '../hooks/useWorker';
import { chp7WorkerDeps } from '../model';
import { chp7Scene, chp9Scene } from '../scenes';
import { Canvas } from '../components/Canvas';
const width = 500;
const height = 500;

export const Chp7ChallengePage = () => {
  const [data, controller] = useWorker<Scene>(chp7Challenge, chp7WorkerDeps);

  const { startWorker, stopWorker } = controller;

  useEffect(() => {
    const pixelCount = width * height;
    const elementCount = pixelCount * 4;
    const sharedArrayBuffer = new SharedArrayBuffer(
      Uint8ClampedArray.BYTES_PER_ELEMENT * elementCount
    );
    const uint8View = new Uint8ClampedArray(sharedArrayBuffer).fill(0);
    const scene = chp9Scene(500, 250);

    startWorker({
      data: {
        ...scene,
        bufferedCanvas: { width, height, buffer: uint8View }
      }
    });
    return () => stopWorker();
  }, []);

  return (
    <Canvas
      width={width}
      height={height}
      canvas={data?.bufferedCanvas ?? null}
    />
  );
};
