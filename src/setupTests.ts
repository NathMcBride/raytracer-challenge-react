// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { expect } from '@jest/globals';
import type { MatcherState } from 'expect';
import '@testing-library/jest-dom';
import 'jest-extended';
import 'jest-extended/all';

import { equal } from './model/util/equal';
import * as tuple from './model/tuple/tuple';
import * as color from './model/color/color';
import { Matrix, formatMatrix } from './model/matrix/matrix';

function toApproxEqualTuple(
  this: MatcherState,
  received: tuple.Tuple,
  expected: tuple.Tuple
) {
  return {
    pass:
      equal(received.x, expected.x) &&
      equal(received.y, expected.y) &&
      equal(received.z, expected.z) &&
      equal(received.w, expected.w),
    message: () =>
      `Received: "${JSON.stringify(
        received,
        null,
        2
      )}" Expected: "${JSON.stringify(expected, null, 2)}"`
  };
}

function toApproxEqualColor(
  this: MatcherState,
  received: color.Color,
  expected: color.Color
) {
  return {
    pass:
      equal(received.red, expected.red) &&
      equal(received.green, expected.green) &&
      equal(received.blue, expected.blue),
    message: () =>
      `Received: "${JSON.stringify(
        received,
        null,
        2
      )}" Expected: "${JSON.stringify(expected, null, 2)}"`
  };
}

function toApproxEqualMatrix(
  this: MatcherState,
  received: Matrix,
  expected: Matrix
) {
  let isEqual = true;
  if (received.length !== expected.length) isEqual = false;

  for (let row = 0; row < received.length; row++) {
    const aRow = received[row];
    const bRow = expected[row];

    if (aRow.length !== bRow.length) {
      isEqual = false;
      break;
    }

    for (let column = 0; column < aRow.length; column++) {
      if (!equal(aRow[column], bRow[column])) {
        isEqual = false;
        break;
      }
    }
  }

  return {
    pass: isEqual,
    message: () =>
      `Received:\n"${formatMatrix(received)}" Expected:\n"${formatMatrix(
        expected
      )}"`
  };
}

function toApproxEqualNumber(
  this: MatcherState,
  received: number,
  expected: number
) {
  return {
    pass: equal(received, expected),
    message: () => `Received: "${received}" Expected: "${expected}"`
  };
}

expect.extend({
  toApproxEqualTuple,
  toApproxEqualColor,
  toApproxEqualMatrix,
  toApproxEqualNumber
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toApproxEqualTuple(expected: tuple.Tuple): R;
      toApproxEqualColor(expected: color.Color): R;
      toApproxEqualMatrix(expected: Matrix): R;
      toApproxEqualNumber(expected: number): R;
    }
  }
}

//Make sure jest/node uses the correct crypto module
if (!('crypto' in globalThis)) globalThis.crypto = require('crypto');
