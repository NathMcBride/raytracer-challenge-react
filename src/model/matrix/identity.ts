import { matrix } from '..';
export function identity() {
  let identity = matrix(4, 4);
  identity = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
  return identity;
}
