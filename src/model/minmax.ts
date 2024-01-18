// export const MAX_RGB = 255;
// export const MIN_RGB = 0;
// export const max = (a: number, b?: number) => (a > MAX_RGB ? MAX_RGB : a);
// export const min = (a: number, b?: number) => (a < MIN_RGB ? MIN_RGB : a);

export const MAX_RGB = 255;
export const MIN_RGB = 0;
export const max = (a: number, b?: number) => (a > 255 ? 255 : a);
export const min = (a: number, b?: number) => (a < 0 ? 0 : a);
