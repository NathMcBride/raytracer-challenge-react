import {
  matrix,
  matrixEqual,
  multiplyMatrix,
  multiplyByTuple,
  transpose,
  determinate,
  submatrix,
  minor,
  cofactor,
  isInvertible,
  inverse
} from '..';
import { tuple } from '..';

describe('matrix', () => {
  it('can construct a 4x4 matrix', () => {
    let m = matrix(4, 4);
    m = [
      [1, 2, 3, 4],
      [5.5, 6.5, 7.5, 8.5],
      [9, 10, 11, 12],
      [13.5, 14.5, 15.5, 16.5]
    ];

    expect(m[0][0]).toEqual(1);
    expect(m[0][3]).toEqual(4);
    expect(m[1][0]).toEqual(5.5);
    expect(m[1][2]).toEqual(7.5);
    expect(m[2][2]).toEqual(11);
    expect(m[3][0]).toEqual(13.5);
    expect(m[3][2]).toEqual(15.5);
  });

  it('can construct a 2x2 matrix', () => {
    let m = matrix(2, 2);
    m = [
      [-3, 5],
      [1, -2]
    ];

    expect(m[0][0]).toEqual(-3);
    expect(m[0][1]).toEqual(5);
    expect(m[1][0]).toEqual(1);
    expect(m[1][1]).toEqual(-2);
  });

  it('can construct a 3x3 matrix', () => {
    let m = matrix(3, 3);
    m = [
      [-3, 5, 0],
      [1, -2, -7],
      [0, 1, 1]
    ];

    expect(m[0][0]).toEqual(-3);
    expect(m[1][1]).toEqual(-2);
    expect(m[2][2]).toEqual(1);
  });

  describe('equality', () => {
    it('identical matrices are equal', () => {
      let a = matrix(4, 4);
      a = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
      ];

      let b = matrix(4, 4);
      b = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
      ];

      expect(matrixEqual(a, b)).toEqual(true);
    });

    it('different matrices are not equal', () => {
      let a = matrix(4, 4);
      a = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
      ];

      let b = matrix(4, 4);
      b = [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
        [8, 7, 6, 5],
        [4, 3, 2, 1]
      ];

      expect(matrixEqual(a, b)).toEqual(false);
    });
  });

  describe('multiply', () => {
    it('multiplies matrices', () => {
      let a = matrix(4, 4);
      a = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
      ];
      let b = matrix(4, 4);
      b = [
        [-2, 1, 2, 3],
        [3, 2, 1, -1],
        [4, 3, 6, 5],
        [1, 2, 7, 8]
      ];
      let expected = matrix(4, 4);
      expected = [
        [20, 22, 50, 48],
        [44, 54, 114, 108],
        [40, 58, 110, 102],
        [16, 26, 46, 42]
      ];

      const c = multiplyMatrix(a, b);

      expect(matrixEqual(c, expected)).toBe(true);
    });

    it('multiplies matrices by tuples', () => {
      let a = matrix(4, 4);
      a = [
        [1, 2, 3, 4],
        [2, 4, 4, 2],
        [8, 6, 4, 1],
        [0, 0, 0, 1]
      ];
      const t = tuple(1, 2, 3, 1);

      const o = multiplyByTuple(a, t);

      expect(o.x).toEqual(18);
      expect(o.y).toEqual(24);
      expect(o.z).toEqual(33);
      expect(o.w).toEqual(1);
    });

    it('multiplies by the identity matrix', () => {
      let a = matrix(4, 4);
      a = [
        [1, 2, 3, 4],
        [2, 4, 4, 2],
        [8, 6, 4, 1],
        [0, 0, 0, 1]
      ];

      let identity = matrix(4, 4);
      identity = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];

      const c = multiplyMatrix(a, identity);

      expect(matrixEqual(c, a)).toBe(true);
    });

    it('multiplies tuple by the identity matrix', () => {
      const t = tuple(1, 2, 3, 1);

      let identity = matrix(4, 4);
      identity = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];

      const o = multiplyByTuple(identity, t);

      expect(o.x).toEqual(1);
      expect(o.y).toEqual(2);
      expect(o.z).toEqual(3);
      expect(o.w).toEqual(1);
    });
  });

  describe('transpose', () => {
    it('transposes a matrix', () => {
      let a = matrix(4, 4);
      a = [
        [0, 9, 3, 0],
        [9, 8, 0, 8],
        [1, 8, 5, 3],
        [0, 0, 5, 8]
      ];

      let expected = matrix(4, 4);
      expected = [
        [0, 9, 1, 0],
        [9, 8, 8, 0],
        [3, 0, 5, 5],
        [0, 8, 3, 8]
      ];

      const transposed = transpose(a);

      expect(matrixEqual(transposed, expected)).toBe(true);
    });

    it('transposes the identity matrix', () => {
      let identity = matrix(4, 4);
      identity = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];

      const a = transpose(identity);

      expect(matrixEqual(a, identity)).toBe(true);
    });
  });

  describe('determinate', () => {
    it('calculates determinate for a 2x2 matrix', () => {
      let a = matrix(2, 2);
      a = [
        [1, 5],
        [-3, 2]
      ];

      expect(determinate(a)).toEqual(17);
    });

    it('calculate determinate of a 3x3 matrix', () => {
      let a = matrix(3, 3);
      a = [
        [1, 2, 6],
        [-5, 8, -4],
        [2, 6, 4]
      ];

      expect(cofactor(a, 0, 0)).toEqual(56);
      expect(cofactor(a, 0, 1)).toEqual(12);
      expect(cofactor(a, 0, 2)).toEqual(-46);
      expect(determinate(a)).toEqual(-196);
    });

    it('calculate determinate of a 4x4 matrix', () => {
      let a = matrix(4, 4);
      a = [
        [-2, -8, 3, 5],
        [-3, 1, 7, 3],
        [1, 2, -9, 6],
        [-6, 7, 7, -9]
      ];

      expect(cofactor(a, 0, 0)).toEqual(690);
      expect(cofactor(a, 0, 1)).toEqual(447);
      expect(cofactor(a, 0, 2)).toEqual(210);
      expect(cofactor(a, 0, 3)).toEqual(51);
      expect(determinate(a)).toEqual(-4071);
    });
  });

  describe('submatrix', () => {
    it('extracts a 2x2 submatrix from a 3x3', () => {
      let a = matrix(3, 3);
      a = [
        [1, 5, 0],
        [-3, 2, 7],
        [0, 6, -3]
      ];

      let expected = matrix(4, 4);
      expected = [
        [-3, 2],
        [0, 6]
      ];

      const c = submatrix(a, 0, 2);

      expect(matrixEqual(c, expected)).toBe(true);
    });

    it('extracts a 3x3 matrix from a 4x4', () => {
      let a = matrix(3, 3);
      a = [
        [-6, 1, 1, 6],
        [-8, 5, 8, 6],
        [-1, 0, 8, 2],
        [-7, 1, -1, 1]
      ];
      let expected = matrix(3, 3);
      expected = [
        [-6, 1, 6],
        [-8, 8, 6],
        [-7, -1, 1]
      ];

      const c = submatrix(a, 2, 1);

      expect(matrixEqual(c, expected)).toBe(true);
    });
  });

  it('calculates the minor of a 3x3 matrix', () => {
    let a = matrix(3, 3);
    a = [
      [3, 5, 0],
      [2, -1, -7],
      [6, -1, 5]
    ];

    const b = submatrix(a, 1, 0);
    expect(determinate(b)).toEqual(25);
    expect(minor(a, 1, 0)).toEqual(25);
  });

  it('calculates the cofactor of a 3x3 matrix', () => {
    let a = matrix(3, 3);
    a = [
      [3, 5, 0],
      [2, -1, -7],
      [6, -1, 5]
    ];

    expect(minor(a, 0, 0)).toEqual(-12);
    expect(cofactor(a, 0, 0)).toEqual(-12);
    expect(minor(a, 1, 0)).toEqual(25);
    expect(cofactor(a, 1, 0)).toEqual(-25);
  });

  describe('inverse', () => {
    it('tests an invertible matrix for invertibility ', () => {
      let a = matrix(4, 4);
      a = [
        [6, 4, 4, 4],
        [5, 5, 7, 6],
        [4, -9, 3, -7],
        [9, 1, 7, -6]
      ];

      expect(determinate(a)).toEqual(-2120);
      expect(isInvertible(a)).toEqual(true);
    });

    it('tests a non invertible matrix for invertibility ', () => {
      let a = matrix(4, 4);
      a = [
        [-4, 2, -2, -3],
        [9, 6, 2, 6],
        [0, -5, 1, -5],
        [0, 0, 0, 0]
      ];

      expect(determinate(a)).toEqual(0);
      expect(isInvertible(a)).toEqual(false);
    });

    it('calculates the inverse of a matrix', () => {
      let a = matrix(4, 4);
      a = [
        [-5, 2, 6, -8],
        [1, -5, 1, 8],
        [7, 7, -6, -7],
        [1, -3, 7, 4]
      ];

      let expected = matrix(4, 4);
      expected = [
        [0.21805, 0.45113, 0.2406, -0.04511],
        [-0.80827, -1.45677, -0.44361, 0.52068],
        [-0.07895, -0.22368, -0.05263, 0.19737],
        [-0.52256, -0.81391, -0.30075, 0.30639]
      ];

      const b = inverse(a);

      expect(determinate(a)).toEqual(532);
      expect(cofactor(a, 2, 3)).toEqual(-160);
      expect(b[3][2]).toEqual(-160 / 532);
      expect(cofactor(a, 3, 2)).toEqual(105);
      expect(b[2][3]).toEqual(105 / 532);
      expect(b).toApproxEqualMatrix(expected);
    });

    it('calculates the inverse of another matrix', () => {
      let a = matrix(4, 4);
      a = [
        [8, -5, 9, 2],
        [7, 5, 6, 1],
        [-6, 0, 9, 6],
        [-3, 0, -9, -4]
      ];

      let expected = matrix(4, 4);
      expected = [
        [-0.15385, -0.15385, -0.28205, -0.53846],
        [-0.07692, 0.12308, 0.02564, 0.03077],
        [0.35897, 0.35897, 0.4359, 0.92308],
        [-0.69231, -0.69231, -0.76923, -1.92308]
      ];

      expect(inverse(a)).toApproxEqualMatrix(expected);
    });

    it('calculates the inverse of a third matrix', () => {
      let a = matrix(4, 4);
      a = [
        [9, 3, 0, 9],
        [-5, -2, -6, -3],
        [-4, 9, 6, 4],
        [-7, 6, 6, 2]
      ];

      let expected = matrix(4, 4);
      expected = [
        [-0.04074, -0.07778, 0.14444, -0.22222],
        [-0.07778, 0.03333, 0.36667, -0.33333],
        [-0.02901, -0.1463, -0.10926, 0.12963],
        [0.17778, 0.06667, -0.26667, 0.33333]
      ];

      expect(inverse(a)).toApproxEqualMatrix(expected);
    });

    it('multiplies a product by its inverse', () => {
      let a = matrix(4, 4);
      a = [
        [3, -9, 7, 3],
        [3, -8, 2, -9],
        [-4, 4, 4, 1],
        [-6, 5, -1, 1]
      ];

      let b = matrix(4, 4);
      b = [
        [8, 2, 2, 2],
        [3, -1, 7, 0],
        [7, 0, 5, 4],
        [6, -2, 0, 5]
      ];

      const product = multiplyMatrix(a, b);

      expect(multiplyMatrix(product, inverse(b))).toApproxEqualMatrix(a);
    });
  });
});
