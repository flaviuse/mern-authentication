'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.printReceivedArrayContainExpectedItem = exports.printReceivedStringContainExpectedResult = exports.printReceivedStringContainExpectedSubstring = void 0;

var _jestMatcherUtils = require('jest-matcher-utils');

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// Format substring but do not enclose in double quote marks.
// The replacement is compatible with pretty-format package.
const printSubstring = val => val.replace(/"|\\/g, '\\$&');

const printReceivedStringContainExpectedSubstring = (received, start, length) =>
  (0, _jestMatcherUtils.RECEIVED_COLOR)(
    '"' +
      printSubstring(received.slice(0, start)) +
      (0, _jestMatcherUtils.INVERTED_COLOR)(
        printSubstring(received.slice(start, start + length))
      ) +
      printSubstring(received.slice(start + length)) +
      '"'
  );

exports.printReceivedStringContainExpectedSubstring = printReceivedStringContainExpectedSubstring;

const printReceivedStringContainExpectedResult = (received, result) =>
  result === null
    ? (0, _jestMatcherUtils.printReceived)(received)
    : printReceivedStringContainExpectedSubstring(
        received,
        result.index,
        result[0].length
      ); // The serialized array is compatible with pretty-format package min option.
// However, items have default stringify depth (instead of depth - 1)
// so expected item looks consistent by itself and enclosed in the array.

exports.printReceivedStringContainExpectedResult = printReceivedStringContainExpectedResult;

const printReceivedArrayContainExpectedItem = (received, index) =>
  (0, _jestMatcherUtils.RECEIVED_COLOR)(
    '[' +
      received
        .map((item, i) => {
          const stringified = (0, _jestMatcherUtils.stringify)(item);
          return i === index
            ? (0, _jestMatcherUtils.INVERTED_COLOR)(stringified)
            : stringified;
        })
        .join(', ') +
      ']'
  );

exports.printReceivedArrayContainExpectedItem = printReceivedArrayContainExpectedItem;
