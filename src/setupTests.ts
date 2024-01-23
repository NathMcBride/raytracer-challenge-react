// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-extended';
import 'jest-extended/all';
import { equal } from './model/equal';
import * as tuple from './model/tuple';
import * as color from './model/color';
import { Matrix, formatMatrix } from './model/matrix';

const matchers = {
  approxEqual(
    // a matcher is a method, it has access to Jest context on `this`
    this: jest.MatcherContext,
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
  },
  approxEqualC(
    // a matcher is a method, it has access to Jest context on `this`
    this: jest.MatcherContext,
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
  },
  approxEqualM(
    // a matcher is a method, it has access to Jest context on `this`
    this: jest.MatcherContext,
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
};

expect.extend(matchers);
