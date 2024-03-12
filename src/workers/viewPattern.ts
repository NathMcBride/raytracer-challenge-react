import {
  writePixelToBuffer,
  Job,
  transformToPPMColor,
  ViewPatternParams,
  point,
  multiplyByTuple,
  inverse,
  patternAtPoint
} from '.';

export const viewPattern: Job<ViewPatternParams> = params => {
  const startTime = performance.now();
  const {
    data: {
      pattern,
      bufferedCanvas: { width, height, buffer }
    }
  } = params;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const uvPoint = point(
        (x * 2 - width) / height,
        (y * 2 - height) / height,
        (y * 2 - height) / height
      );
      const patternPoint = multiplyByTuple(inverse(pattern.transform), uvPoint);
      const color = patternAtPoint(pattern, patternPoint);

      const scaledColor = transformToPPMColor(color);
      writePixelToBuffer({
        buffer,
        x,
        y,
        color: scaledColor,
        width,
        height
      });

      postMessage({
        data: { pattern, bufferedCanvas: { width, height, buffer } },
        status: 'RUNNING'
      });
    }
  }

  const endTime = performance.now();

  console.log(
    `<<<< The render took: ${endTime - startTime}Milliseconds ${
      (endTime - startTime) / 1000
    }Seconds>>>>`
  );
  return {
    data: { pattern, bufferedCanvas: { width, height, buffer } },
    status: 'SUCCESS'
  };
};
