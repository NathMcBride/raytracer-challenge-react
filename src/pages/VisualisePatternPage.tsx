import { useEffect } from 'react';
import { viewPattern } from '../workers';
import { useWorker } from '../hooks/useWorker';
import {
  chp7WorkerDeps,
  color,
  ViewPatternParams,
  radialGlowPattern
} from '../model';
import { Canvas } from '../components/Canvas';

const width = 250;
const height = 250;

export const VisualisePatternPage = () => {
  const [data, controller] = useWorker<ViewPatternParams>(
    viewPattern,
    chp7WorkerDeps
  );

  const { startWorker, stopWorker } = controller;

  useEffect(() => {
    const pixelCount = width * height;
    const elementCount = pixelCount * 4;
    const sharedArrayBuffer = new SharedArrayBuffer(
      Uint8ClampedArray.BYTES_PER_ELEMENT * elementCount
    );
    const uint8View = new Uint8ClampedArray(sharedArrayBuffer).fill(0);

    const pattern = radialGlowPattern(color(1.0, 2.0, 3.0));

    startWorker({
      data: {
        pattern,
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
