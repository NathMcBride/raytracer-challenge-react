import { Color, multiplyByScalar, clampColor, round, MAX_RGB } from '.';

export type Canvas = {
  width: number;
  height: number;
  buffer: number[];
};

export type BufferedCanvas = {
  width: number;
  height: number;
  buffer: Uint8ClampedArray;
};

export const canvas = (width: number, height: number): Canvas => {
  //RGBA element
  const pixelCount = width * height;
  const elementCount = pixelCount * 4;
  const canvas = new Array<number>(elementCount).fill(0);
  return { width, height, buffer: canvas };
};

export const bufferedCanvas = (
  width: number,
  height: number
): BufferedCanvas => {
  const pixelCount = width * height;
  const elementCount = pixelCount * 4;
  const canvas = new Uint8ClampedArray(elementCount).fill(0);
  return { width, height, buffer: canvas };
};

export const writePixel = (
  canvas: Canvas,
  x: number,
  y: number,
  color: Color
) => {
  const { width, height, buffer: data } = canvas;
  const index = (x + y * width) * 4;

  if (index > data.length) {
    const msg = 'Attempted to write pixel outside of bounds';
    const error = { x, y, width, height, index, length: data.length };
    console.log(msg + JSON.stringify(error, null, 2));
    return;
  }

  data[index + 0] = color.red;
  data[index + 1] = color.green;
  data[index + 2] = color.blue;
  data[index + 3] = 1;
};

type PixelToBufferArgs = {
  buffer: Uint8ClampedArray;
  x: number;
  y: number;
  color: Color;
  width: number;
  height: number;
};
export const writePixelToBuffer = (args: PixelToBufferArgs, b?: number) => {
  const { x, y, color, width, height, buffer: data } = args;
  const index = (x + y * width) * 4;

  if (index > data.length) {
    const msg = 'Attempted to write pixel outside of bounds';
    const error = { x, y, width, height, index, length: data.length };
    console.log(msg + JSON.stringify(error, null, 2));
    return;
  }

  const opaque = 255;
  data[index + 0] = color.red;
  data[index + 1] = color.green;
  data[index + 2] = color.blue;
  data[index + 3] = opaque;
};

export const pixelAt = (canvas: Canvas, x: number, y: number): Color => {
  const { width, buffer: data } = canvas;
  const index = (x + y * width) * 4;

  const red = data[index + 0];
  const green = data[index + 1];
  const blue = data[index + 2];

  return { red, green, blue };
};

export const transformToPPMColor = (color: Color, b?: number): Color =>
  round(clampColor(multiplyByScalar(color, 255)));

const MAX_PPM_LINE_LENGTH = 70;
const maxLength = (line: string): boolean => line.length >= MAX_PPM_LINE_LENGTH;

const ppmWriter = () => {
  let buffer = '';
  let line = '';
  const writer = {
    write: (a: string) => {
      maxLength(line + a) ? writer.flush(a) : (line += a);
      return writer;
    },
    flush: (a?: string) => {
      buffer += line + '\n';
      line = a ? a.trim() : '';
    },
    buffer: (): string => buffer
  };

  return writer;
};

export const canvasToPPM = (canvas: Canvas): string => {
  const { write, flush, buffer } = ppmWriter();

  const header = `P3\n${canvas.width} ${canvas.height}\n${MAX_RGB}`;
  write(header);
  flush();

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const pixel = transformToPPMColor(pixelAt(canvas, x, y));
      if (x > 0) write(' ');
      write(`${pixel.red}`);
      write(` ${pixel.green}`);
      write(` ${pixel.blue}`);
    }
    flush();
  }

  return buffer();
};
