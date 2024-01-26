import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BufferedCanvas } from '../model';

export const Canvas = (props: {
  width: number;
  height: number;
  canvas: BufferedCanvas | null;
}) => {
  const { width, height, canvas: bufferedCanvas } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeStamp, setTimeStamp] = useState<DOMHighResTimeStamp>(0);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    context.fillStyle = '#61cc1e';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.imageSmoothingEnabled = false;
    setCtx(context);
  }, []);

  useLayoutEffect(() => {
    let requestId: number;

    const animate = (time: DOMHighResTimeStamp) => {
      setTimeStamp(time);
      requestId = requestAnimationFrame(animate);
    };
    requestId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId);
  }, []);

  useEffect(() => {
    if (!ctx) return;
    if (!bufferedCanvas) return;
    const array = new Uint8ClampedArray(bufferedCanvas.buffer);
    const image = new ImageData(
      array,
      bufferedCanvas.width,
      bufferedCanvas.height
    );
    ctx.putImageData(image, 0, 0);
  }, [ctx, timeStamp]);

  return <canvas width={width} height={height} ref={canvasRef} />;
};
