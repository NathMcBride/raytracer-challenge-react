import { toTuple, minor, multiplyMatrix, toMatrix } from '..';
import { Tuple, Point, Vector } from '..';
export type Matrix = Array<Array<number>>;

export const matrix = (rows: number, columns: number): Matrix => {
  const data = Array.from(Array(rows), () =>
    new Array<number>(columns).fill(0)
  );
  return data;
};

export const matrixEqual = (a: Matrix, b: Matrix): boolean => {
  if (a.length !== b.length) return false;

  let equal = true;

  for (let row = 0; row < a.length; row++) {
    const aRow = a[row];
    const bRow = b[row];

    if (aRow.length !== bRow.length) {
      equal = false;
      break;
    }

    for (let column = 0; column < aRow.length; column++) {
      if (aRow[column] !== bRow[column]) {
        equal = false;
        break;
      }
    }
  }

  return equal;
};

export function multiplyByTuple(a: Matrix, b: Point): Point;
export function multiplyByTuple(a: Matrix, b: Vector): Vector;
export function multiplyByTuple(a: Matrix, b: Tuple): Tuple;
export function multiplyByTuple(a: Matrix, b: Tuple): Tuple {
  return toTuple(multiplyMatrix(a, toMatrix(b)));
}

export const deepClone = (a: Matrix, b?: number): Matrix =>
  a.map(row => row.slice());

export const cofactor = (a: Matrix, row: number, column: number): number => {
  const isOdd = (a: number): boolean => a % 2 !== 0;
  const m = minor(a, row, column);
  return isOdd(row + column) ? -m : m;
};

const Log = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  // Foreground (text) colors
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m'
  },
  // Background colors
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m'
  }
};

const log = (color: string, text: string) => {
  console.log(`${color}%s${Log.reset}`, text);
};
// log(Log.fg.red, 'My text is red' + '');
// log(Log.bg.cyan, 'My background is cyan');

export const formatMatrix = (m: Matrix): string => {
  let info = '';
  m.forEach(row => {
    row.forEach(column => (info += ' ' + column + ' '));
    info += '\n';
  });

  return info;
};

export const logMatrix = (m: Matrix) => log(Log.fg.yellow, formatMatrix(m));
