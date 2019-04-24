/**
 * @module 'winston-mongodb-test'
 * @fileoverview Tests for instances of the MongoDB transport
 * @license MIT
 * @author charlie@nodejitsu.com (Charlie Robbins)
 * @author 0@39.yt (Yurij Mikhalevich)
 */
'use strict';
const vows = require('vows');
const mongodb = require('mongodb');
const transport = require('winston/test/transports/transport');
const MongoDB = require('../lib/winston-mongodb').MongoDB;
const dbUrl = process.env.USER_WINSTON_MONGODB_URL
    ||process.env.WINSTON_MONGODB_URL||'mongodb://localhost/winston';

vows.describe('winston-mongodb').addBatch({
  '{db: url}': transport(MongoDB, {db: dbUrl}),
}).addBatch({'{db: url} on capped collection': transport(MongoDB,
    {db: dbUrl, capped: true, collection: 'cappedLog'}),
}).addBatch({
  '{db: promise}': transport(MongoDB, {db: mongodb.MongoClient.connect(dbUrl)})
}).addBatch({
  '{db: preconnected}': {
    topic: function(){
      mongodb.MongoClient.connect(dbUrl, this.callback);
    },
    prepare: function(db){
      Object.assign(this.context.tests.test, transport(MongoDB, {db}));
    },
    test: {
      dummy: ()=>{}, // hack to be able to execute asynchronously added tests
    },
  }
}).export(module);
