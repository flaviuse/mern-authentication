/**
 * @module helpers
 * @fileoverview Helpers for winston-mongodb
 * @license MIT
 * @author 0@39.yt (Yurij Mikhalevich)
 */
'use strict';
const ObjectID = require('mongodb').ObjectID;


/**
 * Prepares metadata to store into database.
 * @param {*} meta Metadata
 * @return {*}
 */
exports.prepareMetaData = meta=>{
  return cloneMeta(meta);
};


/**
 * Clones meta object and cleans it from circular references, replacing them
 * with string '[Circular]' and fixes field names to be storable within
 * MongoDB
 * @param {Object} node Current object or its leaf
 * @param {Array=} opt_parents Object's parents
 */
function cloneMeta(node, opt_parents) {
  if (!(node instanceof Object) || (node instanceof ObjectID)
      || (node instanceof Buffer)) {
    return node;
  }
  let copy = Array.isArray(node) ? [] : {};
  if (node instanceof Date) {
    return new Date(node.getTime());
  } else if (node instanceof Error) {
    // This is needed because Error's message, name and stack isn't accessible when cycling through properties
    copy = {message: node.message, name: node.name, stack: node.stack};
  }
  opt_parents = opt_parents || [];
  opt_parents.push(node);
  for (let key in node) {
    if (!Object.prototype.hasOwnProperty.call(node, key)) {
      continue;
    }
    let value = node[key];
    let newKey = key;
    if (newKey.includes('.') || newKey.includes('$')) {
        newKey = newKey.replace(/\./g, '[dot]').replace(/\$/g, '[$]');
    }
    if (value instanceof Object) {
      if (opt_parents.indexOf(value) === -1) {
        copy[newKey] = cloneMeta(value, opt_parents);
      } else {
        copy[newKey] = '[Circular]';
      }
    } else {
      copy[newKey] = value;
    }
  }
  opt_parents.pop();
  return copy;
}
