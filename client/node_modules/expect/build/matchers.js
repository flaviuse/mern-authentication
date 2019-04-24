'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _jestGetType = _interopRequireWildcard(require('jest-get-type'));

var _jestMatcherUtils = require('jest-matcher-utils');

var _print = require('./print');

var _utils = require('./utils');

var _jasmineUtils = require('./jasmineUtils');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const matchers = {
  toBe(received, expected) {
    const matcherName = '.toBe';
    const options = {
      comment: 'Object.is equality',
      isNot: this.isNot
    };
    const pass = Object.is(received, expected);
    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ) +
          '\n\n' +
          `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
          `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`
      : () => {
          const receivedType = (0, _jestGetType.default)(received);
          const expectedType = (0, _jestGetType.default)(expected);
          const suggestToEqual =
            receivedType === expectedType &&
            (receivedType === 'object' || expectedType === 'array') &&
            (0, _jasmineUtils.equals)(received, expected, [
              _utils.iterableEquality
            ]);
          const oneline = (0, _utils.isOneline)(expected, received);
          const diffString = (0, _jestMatcherUtils.diff)(expected, received, {
            expand: this.expand
          });
          return (
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              undefined,
              undefined,
              options
            ) +
            '\n\n' +
            `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
            `Received: ${(0, _jestMatcherUtils.printReceived)(received)}` +
            (diffString && !oneline ? `\n\nDifference:\n\n${diffString}` : '') +
            (suggestToEqual ? ` ${_jestMatcherUtils.SUGGEST_TO_EQUAL}` : '')
          );
        }; // Passing the actual and expected objects so that a custom reporter
    // could access them, for example in order to display a custom visual diff,
    // or create a different error message

    return {
      actual: received,
      expected,
      message,
      name: 'toBe',
      pass
    };
  },

  toBeCloseTo(received, expected, precision = 2) {
    const matcherName = 'toBeCloseTo';
    const secondArgument = arguments.length === 3 ? 'precision' : undefined;
    const options = {
      isNot: this.isNot,
      promise: this.promise,
      secondArgument
    };
    (0, _jestMatcherUtils.ensureNumbers)(
      received,
      expected,
      matcherName,
      options
    );
    let pass = false;
    let expectedDiff = 0;
    let receivedDiff = 0;

    if (received === Infinity && expected === Infinity) {
      pass = true; // Infinity - Infinity is NaN
    } else if (received === -Infinity && expected === -Infinity) {
      pass = true; // -Infinity - -Infinity is NaN
    } else {
      expectedDiff = Math.pow(10, -precision) / 2;
      receivedDiff = Math.abs(expected - received);
      pass = receivedDiff < expectedDiff;
    }

    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ) +
          '\n\n' +
          `Expected: not ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
          (receivedDiff === 0
            ? ''
            : `Received:     ${(0, _jestMatcherUtils.printReceived)(
                received
              )}\n` +
              '\n' +
              `Expected precision:        ${(0,
              _jestMatcherUtils.printExpected)(precision)}\n` +
              `Expected difference: not < ${(0,
              _jestMatcherUtils.printExpected)(expectedDiff)}\n` +
              `Received difference:       ${(0,
              _jestMatcherUtils.printReceived)(receivedDiff)}`)
      : () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ) +
          '\n\n' +
          `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
          `Received: ${(0, _jestMatcherUtils.printReceived)(received)}\n` +
          '\n' +
          `Expected precision:    ${(0, _jestMatcherUtils.printExpected)(
            precision
          )}\n` +
          `Expected difference: < ${(0, _jestMatcherUtils.printExpected)(
            expectedDiff
          )}\n` +
          `Received difference:   ${(0, _jestMatcherUtils.printReceived)(
            receivedDiff
          )}`;
    return {
      message,
      pass
    };
  },

  toBeDefined(received, expected) {
    const matcherName = 'toBeDefined';
    const options = {
      isNot: this.isNot,
      promise: this.promise
    };
    (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
    const pass = received !== void 0;

    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(matcherName, undefined, '', options) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;

    return {
      message,
      pass
    };
  },

  toBeFalsy(received, expected) {
    const matcherName = 'toBeFalsy';
    const options = {
      isNot: this.isNot,
      promise: this.promise
    };
    (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
    const pass = !received;

    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(matcherName, undefined, '', options) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;

    return {
      message,
      pass
    };
  },

  toBeGreaterThan(received, expected) {
    const matcherName = 'toBeGreaterThan';
    const isNot = this.isNot;
    const options = {
      isNot,
      promise: this.promise
    };
    (0, _jestMatcherUtils.ensureNumbers)(
      received,
      expected,
      matcherName,
      options
    );
    const pass = received > expected;

    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(
        matcherName,
        undefined,
        undefined,
        options
      ) +
      '\n\n' +
      `Expected:${isNot ? ' not' : ''} > ${(0, _jestMatcherUtils.printExpected)(
        expected
      )}\n` +
      `Received:${isNot ? '    ' : ''}   ${(0, _jestMatcherUtils.printReceived)(
        received
      )}`;

    return {
      message,
      pass
    };
  },

  toBeGreaterThanOrEqual(received, expected) {
    const matcherName = 'toBeGreaterThanOrEqual';
    const isNot = this.isNot;
    const options = {
      isNot,
      promise: this.promise
    };
    (0, _jestMatcherUtils.ensureNumbers)(
      received,
      expected,
      matcherName,
      options
    );
    const pass = received >= expected;

    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(
        matcherName,
        undefined,
        undefined,
        options
      ) +
      '\n\n' +
      `Expected:${isNot ? ' not' : ''} >= ${(0,
      _jestMatcherUtils.printExpected)(expected)}\n` +
      `Received:${isNot ? '    ' : ''}    ${(0,
      _jestMatcherUtils.printReceived)(received)}`;

    return {
      message,
      pass
    };
  },

  toBeInstanceOf(received, expected) {
    const matcherName = 'toBeInstanceOf';
    const options = {
      isNot: this.isNot,
      promise: this.promise
    };

    if (typeof expected !== 'function') {
      throw new Error(
        (0, _jestMatcherUtils.matcherErrorMessage)(
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ),
          `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
            'expected'
          )} value must be a function`,
          (0, _jestMatcherUtils.printWithType)(
            'Expected',
            expected,
            _jestMatcherUtils.printExpected
          )
        )
      );
    }

    const pass = received instanceof expected;
    const NAME_IS_NOT_STRING = ' name is not a string\n';
    const NAME_IS_EMPTY_STRING = ' name is an empty string\n';
    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ) +
          '\n\n' + // A truthy test for `expected.name` property has false positive for:
          // function with a defined name property
          (typeof expected.name !== 'string'
            ? 'Expected constructor' + NAME_IS_NOT_STRING
            : expected.name.length === 0
            ? 'Expected constructor' + NAME_IS_EMPTY_STRING
            : `Expected constructor: not ${(0,
              _jestMatcherUtils.EXPECTED_COLOR)(expected.name)}\n`) +
          `Received value: ${(0, _jestMatcherUtils.printReceived)(received)}`
      : () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ) +
          '\n\n' + // A truthy test for `expected.name` property has false positive for:
          // function with a defined name property
          (typeof expected.name !== 'string'
            ? 'Expected constructor' + NAME_IS_NOT_STRING
            : expected.name.length === 0
            ? 'Expected constructor' + NAME_IS_EMPTY_STRING
            : `Expected constructor: ${(0, _jestMatcherUtils.EXPECTED_COLOR)(
                expected.name
              )}\n`) +
          ((0, _jestGetType.isPrimitive)(received) ||
          Object.getPrototypeOf(received) === null
            ? 'Received value has no prototype\n'
            : typeof received.constructor !== 'function'
            ? ''
            : typeof received.constructor.name !== 'string'
            ? 'Received constructor' + NAME_IS_NOT_STRING
            : received.constructor.name.length === 0
            ? 'Received constructor' + NAME_IS_EMPTY_STRING
            : `Received constructor: ${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                received.constructor.name
              )}\n`) +
          `Received value: ${(0, _jestMatcherUtils.printReceived)(received)}`;
    return {
      message,
      pass
    };
  },

  toBeLessThan(received, expected) {
    const matcherName = 'toBeLessThan';
    const isNot = this.isNot;
    const options = {
      isNot,
      promise: this.promise
    };
    (0, _jestMatcherUtils.ensureNumbers)(
      received,
      expected,
      matcherName,
      options
    );
    const pass = received < expected;

    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(
        matcherName,
        undefined,
        undefined,
        options
      ) +
      '\n\n' +
      `Expected:${isNot ? ' not' : ''} < ${(0, _jestMatcherUtils.printExpected)(
        expected
      )}\n` +
      `Received:${isNot ? '    ' : ''}   ${(0, _jestMatcherUtils.printReceived)(
        received
      )}`;

    return {
      message,
      pass
    };
  },

  toBeLessThanOrEqual(received, expected) {
    const matcherName = 'toBeLessThanOrEqual';
    const isNot = this.isNot;
    const options = {
      isNot,
      promise: this.promise
    };
    (0, _jestMatcherUtils.ensureNumbers)(
      received,
      expected,
      matcherName,
      options
    );
    const pass = received <= expected;

    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(
        matcherName,
        undefined,
        undefined,
        options
      ) +
      '\n\n' +
      `Expected:${isNot ? ' not' : ''} <= ${(0,
      _jestMatcherUtils.printExpected)(expected)}\n` +
      `Received:${isNot ? '    ' : ''}    ${(0,
      _jestMatcherUtils.printReceived)(received)}`;

    return {
      message,
      pass
    };
  },

  toBeNaN(received, expected) {
    const matcherName = 'toBeNaN';
    const options = {
      isNot: this.isNot,
      promise: this.promise
    };
    (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
    const pass = Number.isNaN(received);

    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(matcherName, undefined, '', options) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;

    return {
      message,
      pass
    };
  },

  toBeNull(received, expected) {
    const matcherName = 'toBeNull';
    const options = {
      isNot: this.isNot,
      promise: this.promise
    };
    (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
    const pass = received === null;

    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(matcherName, undefined, '', options) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;

    return {
      message,
      pass
    };
  },

  toBeTruthy(received, expected) {
    const matcherName = 'toBeTruthy';
    const options = {
      isNot: this.isNot,
      promise: this.promise
    };
    (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
    const pass = !!received;

    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(matcherName, undefined, '', options) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;

    return {
      message,
      pass
    };
  },

  toBeUndefined(received, expected) {
    const matcherName = 'toBeUndefined';
    const options = {
      isNot: this.isNot,
      promise: this.promise
    };
    (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
    const pass = received === void 0;

    const message = () =>
      (0, _jestMatcherUtils.matcherHint)(matcherName, undefined, '', options) +
      '\n\n' +
      `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;

    return {
      message,
      pass
    };
  },

  toContain(received, expected) {
    const matcherName = 'toContain';
    const isNot = this.isNot;
    const options = {
      comment: 'indexOf',
      isNot,
      promise: this.promise
    };

    if (received == null) {
      throw new Error(
        (0, _jestMatcherUtils.matcherErrorMessage)(
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ),
          `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
            'received'
          )} value must not be null nor undefined`,
          (0, _jestMatcherUtils.printWithType)(
            'Received',
            received,
            _jestMatcherUtils.printReceived
          )
        )
      );
    }

    if (typeof received === 'string') {
      const index = received.indexOf(String(expected));
      const pass = index !== -1;

      const message = () => {
        const labelExpected = `Expected ${
          typeof expected === 'string' ? 'substring' : 'value'
        }`;
        const labelReceived = 'Received string';
        const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
          labelExpected,
          labelReceived
        );
        return (
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ) +
          '\n\n' +
          `${printLabel(labelExpected)}${isNot ? 'not ' : ''}${(0,
          _jestMatcherUtils.printExpected)(expected)}\n` +
          `${printLabel(labelReceived)}${isNot ? '    ' : ''}${
            isNot
              ? (0, _print.printReceivedStringContainExpectedSubstring)(
                  received,
                  index,
                  String(expected).length
                )
              : (0, _jestMatcherUtils.printReceived)(received)
          }`
        );
      };

      return {
        message,
        pass
      };
    }

    const indexable = Array.from(received);
    const index = indexable.indexOf(expected);
    const pass = index !== -1;

    const message = () => {
      const labelExpected = 'Expected value';
      const labelReceived = `Received ${(0, _jestGetType.default)(received)}`;
      const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
        labelExpected,
        labelReceived
      );
      return (
        (0, _jestMatcherUtils.matcherHint)(
          matcherName,
          undefined,
          undefined,
          options
        ) +
        '\n\n' +
        `${printLabel(labelExpected)}${isNot ? 'not ' : ''}${(0,
        _jestMatcherUtils.printExpected)(expected)}\n` +
        `${printLabel(labelReceived)}${isNot ? '    ' : ''}${
          isNot && Array.isArray(received)
            ? (0, _print.printReceivedArrayContainExpectedItem)(received, index)
            : (0, _jestMatcherUtils.printReceived)(received)
        }` +
        (!isNot &&
        indexable.findIndex(item =>
          (0, _jasmineUtils.equals)(item, expected, [_utils.iterableEquality])
        ) !== -1
          ? `\n\n${_jestMatcherUtils.SUGGEST_TO_CONTAIN_EQUAL}`
          : '')
      );
    };

    return {
      message,
      pass
    };
  },

  toContainEqual(received, expected) {
    const matcherName = 'toContainEqual';
    const isNot = this.isNot;
    const options = {
      comment: 'deep equality',
      isNot,
      promise: this.promise
    };

    if (received == null) {
      throw new Error(
        (0, _jestMatcherUtils.matcherErrorMessage)(
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ),
          `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
            'received'
          )} value must not be null nor undefined`,
          (0, _jestMatcherUtils.printWithType)(
            'Received',
            received,
            _jestMatcherUtils.printReceived
          )
        )
      );
    }

    const index = Array.from(received).findIndex(item =>
      (0, _jasmineUtils.equals)(item, expected, [_utils.iterableEquality])
    );
    const pass = index !== -1;

    const message = () => {
      const labelExpected = 'Expected value';
      const labelReceived = `Received ${(0, _jestGetType.default)(received)}`;
      const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
        labelExpected,
        labelReceived
      );
      return (
        (0, _jestMatcherUtils.matcherHint)(
          matcherName,
          undefined,
          undefined,
          options
        ) +
        '\n\n' +
        `${printLabel(labelExpected)}${isNot ? 'not ' : ''}${(0,
        _jestMatcherUtils.printExpected)(expected)}\n` +
        `${printLabel(labelReceived)}${isNot ? '    ' : ''}${
          isNot && Array.isArray(received)
            ? (0, _print.printReceivedArrayContainExpectedItem)(received, index)
            : (0, _jestMatcherUtils.printReceived)(received)
        }`
      );
    };

    return {
      message,
      pass
    };
  },

  toEqual(received, expected) {
    const matcherName = '.toEqual';
    const options = {
      isNot: this.isNot
    };
    const pass = (0, _jasmineUtils.equals)(received, expected, [
      _utils.iterableEquality
    ]);
    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ) +
          '\n\n' +
          `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
          `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`
      : () => {
          const difference = (0, _jestMatcherUtils.diff)(expected, received, {
            expand: this.expand
          });
          return (
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              undefined,
              undefined,
              options
            ) +
            '\n\n' +
            (difference && difference.includes('- Expect')
              ? `Difference:\n\n${difference}`
              : `Expected: ${(0, _jestMatcherUtils.printExpected)(
                  expected
                )}\n` +
                `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`)
          );
        }; // Passing the actual and expected objects so that a custom reporter
    // could access them, for example in order to display a custom visual diff,
    // or create a different error message

    return {
      actual: received,
      expected,
      message,
      name: 'toEqual',
      pass
    };
  },

  toHaveLength(received, expected) {
    const matcherName = 'toHaveLength';
    const isNot = this.isNot;
    const options = {
      isNot,
      promise: this.promise
    };

    if (
      typeof received !== 'string' &&
      (!received || typeof received.length !== 'number')
    ) {
      throw new Error(
        (0, _jestMatcherUtils.matcherErrorMessage)(
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ),
          `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
            'received'
          )} value must have a length property whose value must be a number`,
          (0, _jestMatcherUtils.printWithType)(
            'Received',
            received,
            _jestMatcherUtils.printReceived
          )
        )
      );
    }

    (0, _jestMatcherUtils.ensureExpectedIsNonNegativeInteger)(
      expected,
      matcherName,
      options
    );
    const pass = received.length === expected;

    const message = () => {
      const labelExpected = 'Expected length';
      const labelReceivedLength = 'Received length';
      const labelReceivedValue = `Received ${(0, _jestGetType.default)(
        received
      )}`;
      const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
        labelExpected,
        labelReceivedLength,
        labelReceivedValue
      );
      return (
        (0, _jestMatcherUtils.matcherHint)(
          matcherName,
          undefined,
          undefined,
          options
        ) +
        '\n\n' +
        `${printLabel(labelExpected)}${isNot ? 'not ' : ''}${(0,
        _jestMatcherUtils.printExpected)(expected)}\n` +
        (isNot
          ? ''
          : `${printLabel(labelReceivedLength)}${(0,
            _jestMatcherUtils.printReceived)(received.length)}\n`) +
        `${printLabel(labelReceivedValue)}${isNot ? '    ' : ''}${(0,
        _jestMatcherUtils.printReceived)(received)}`
      );
    };

    return {
      message,
      pass
    };
  },

  toHaveProperty(object, keyPath, value) {
    const matcherName = '.toHaveProperty';
    const valuePassed = arguments.length === 3;
    const secondArgument = valuePassed ? 'value' : '';
    const options = {
      isNot: this.isNot,
      secondArgument
    };

    if (object === null || object === undefined) {
      throw new Error(
        (0, _jestMatcherUtils.matcherErrorMessage)(
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            'path',
            options
          ),
          `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
            'received'
          )} value must not be null nor undefined`,
          (0, _jestMatcherUtils.printWithType)(
            'Received',
            object,
            _jestMatcherUtils.printReceived
          )
        )
      );
    }

    const keyPathType = (0, _jestGetType.default)(keyPath);

    if (keyPathType !== 'string' && keyPathType !== 'array') {
      throw new Error(
        (0, _jestMatcherUtils.matcherErrorMessage)(
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            'path',
            options
          ),
          `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
            'expected'
          )} path must be a string or array`,
          (0, _jestMatcherUtils.printWithType)(
            'Expected',
            keyPath,
            _jestMatcherUtils.printExpected
          )
        )
      );
    }

    const result = (0, _utils.getPath)(object, keyPath);
    const lastTraversedObject = result.lastTraversedObject,
      hasEndProp = result.hasEndProp;
    const pass = valuePassed
      ? (0, _jasmineUtils.equals)(result.value, value, [
          _utils.iterableEquality
        ])
      : hasEndProp;
    const traversedPath = result.traversedPath.join('.');
    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            'object',
            'path',
            options
          ) +
          '\n\n' +
          `Expected the object:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(object)}\n` +
          `Not to have a nested property:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(keyPath)}\n` +
          (valuePassed
            ? `With a value of:\n  ${(0, _jestMatcherUtils.printExpected)(
                value
              )}\n`
            : '')
      : () => {
          const difference =
            valuePassed && hasEndProp
              ? (0, _jestMatcherUtils.diff)(value, result.value, {
                  expand: this.expand
                })
              : '';
          return (
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              'object',
              'path',
              options
            ) +
            '\n\n' +
            `Expected the object:\n` +
            `  ${(0, _jestMatcherUtils.printReceived)(object)}\n` +
            `To have a nested property:\n` +
            `  ${(0, _jestMatcherUtils.printExpected)(keyPath)}\n` +
            (valuePassed
              ? `With a value of:\n  ${(0, _jestMatcherUtils.printExpected)(
                  value
                )}\n`
              : '') +
            (hasEndProp
              ? `Received:\n` +
                `  ${(0, _jestMatcherUtils.printReceived)(result.value)}` +
                (difference ? `\n\nDifference:\n\n${difference}` : '')
              : traversedPath
              ? `Received:\n  ${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                  'object'
                )}.${traversedPath}: ${(0, _jestMatcherUtils.printReceived)(
                  lastTraversedObject
                )}`
              : '')
          );
        };

    if (pass === undefined) {
      throw new Error('pass must be initialized');
    }

    return {
      message,
      pass
    };
  },

  toMatch(received, expected) {
    const matcherName = 'toMatch';
    const options = {
      isNot: this.isNot,
      promise: this.promise
    };

    if (typeof received !== 'string') {
      throw new Error(
        (0, _jestMatcherUtils.matcherErrorMessage)(
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ),
          `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
            'received'
          )} value must be a string`,
          (0, _jestMatcherUtils.printWithType)(
            'Received',
            received,
            _jestMatcherUtils.printReceived
          )
        )
      );
    }

    if (
      !(typeof expected === 'string') &&
      !(expected && typeof expected.test === 'function')
    ) {
      throw new Error(
        (0, _jestMatcherUtils.matcherErrorMessage)(
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ),
          `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
            'expected'
          )} value must be a string or regular expression`,
          (0, _jestMatcherUtils.printWithType)(
            'Expected',
            expected,
            _jestMatcherUtils.printExpected
          )
        )
      );
    }

    const pass =
      typeof expected === 'string'
        ? received.includes(expected)
        : expected.test(received);
    const message = pass
      ? () =>
          typeof expected === 'string'
            ? (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                undefined,
                undefined,
                options
              ) +
              '\n\n' +
              `Expected substring: not ${(0, _jestMatcherUtils.printExpected)(
                expected
              )}\n` +
              `Received string:        ${(0,
              _print.printReceivedStringContainExpectedSubstring)(
                received,
                received.indexOf(expected),
                expected.length
              )}`
            : (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                undefined,
                undefined,
                options
              ) +
              '\n\n' +
              `Expected pattern: not ${(0, _jestMatcherUtils.printExpected)(
                expected
              )}\n` +
              `Received string:      ${(0,
              _print.printReceivedStringContainExpectedResult)(
                received,
                typeof expected.exec === 'function'
                  ? expected.exec(received)
                  : null
              )}`
      : () => {
          const labelExpected = `Expected ${
            typeof expected === 'string' ? 'substring' : 'pattern'
          }`;
          const labelReceived = 'Received string';
          const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
            labelExpected,
            labelReceived
          );
          return (
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              undefined,
              undefined,
              options
            ) +
            '\n\n' +
            `${printLabel(labelExpected)}${(0, _jestMatcherUtils.printExpected)(
              expected
            )}\n` +
            `${printLabel(labelReceived)}${(0, _jestMatcherUtils.printReceived)(
              received
            )}`
          );
        };
    return {
      message,
      pass
    };
  },

  toMatchObject(receivedObject, expectedObject) {
    const matcherName = '.toMatchObject';
    const options = {
      isNot: this.isNot
    };

    if (typeof receivedObject !== 'object' || receivedObject === null) {
      throw new Error(
        (0, _jestMatcherUtils.matcherErrorMessage)(
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ),
          `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
            'received'
          )} value must be a non-null object`,
          (0, _jestMatcherUtils.printWithType)(
            'Received',
            receivedObject,
            _jestMatcherUtils.printReceived
          )
        )
      );
    }

    if (typeof expectedObject !== 'object' || expectedObject === null) {
      throw new Error(
        (0, _jestMatcherUtils.matcherErrorMessage)(
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ),
          `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
            'expected'
          )} value must be a non-null object`,
          (0, _jestMatcherUtils.printWithType)(
            'Expected',
            expectedObject,
            _jestMatcherUtils.printExpected
          )
        )
      );
    }

    const pass = (0, _jasmineUtils.equals)(receivedObject, expectedObject, [
      _utils.iterableEquality,
      _utils.subsetEquality
    ]);
    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ) +
          `\n\nExpected value not to match object:\n` +
          `  ${(0, _jestMatcherUtils.printExpected)(expectedObject)}` +
          `\nReceived:\n` +
          `  ${(0, _jestMatcherUtils.printReceived)(receivedObject)}`
      : () => {
          const difference = (0, _jestMatcherUtils.diff)(
            expectedObject,
            (0, _utils.getObjectSubset)(receivedObject, expectedObject),
            {
              expand: this.expand
            }
          );
          return (
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              undefined,
              undefined,
              options
            ) +
            `\n\nExpected value to match object:\n` +
            `  ${(0, _jestMatcherUtils.printExpected)(expectedObject)}` +
            `\nReceived:\n` +
            `  ${(0, _jestMatcherUtils.printReceived)(receivedObject)}` +
            (difference ? `\nDifference:\n${difference}` : '')
          );
        };
    return {
      message,
      pass
    };
  },

  toStrictEqual(received, expected) {
    const matcherName = '.toStrictEqual';
    const options = {
      isNot: this.isNot
    };
    const pass = (0, _jasmineUtils.equals)(
      received,
      expected,
      [
        _utils.iterableEquality,
        _utils.typeEquality,
        _utils.sparseArrayEquality
      ],
      true
    );
    const message = pass
      ? () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            undefined,
            options
          ) +
          '\n\n' +
          `Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
          `Received: ${(0, _jestMatcherUtils.printReceived)(received)}`
      : () => {
          const difference = (0, _jestMatcherUtils.diff)(expected, received, {
            expand: this.expand
          });
          return (
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              undefined,
              undefined,
              options
            ) + (difference ? `\n\nDifference:\n\n${difference}` : '')
          );
        }; // Passing the actual and expected objects so that a custom reporter
    // could access them, for example in order to display a custom visual diff,
    // or create a different error message

    return {
      actual: received,
      expected,
      message,
      name: 'toStrictEqual',
      pass
    };
  }
};
var _default = matchers;
exports.default = _default;
