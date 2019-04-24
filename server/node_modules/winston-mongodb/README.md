# winston
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/indexzero/winston-mongodb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

A MongoDB transport for [winston][0].

Current version supports only mongodb driver version 2.x. If you want to use
winston-mongodb with mongodb version 1.4.x use winston-mongodb <1.x.

## Motivation
`tldr;?`: To break the [winston][0] codebase into small modules that work
together.

The [winston][0] codebase has been growing significantly with contributions and
other logging transports. This is **awesome**. However, taking a ton of
additional dependencies just to do something simple like logging to the Console
and a File is overkill.  

## Usage
``` js
  var winston = require('winston');

  /**
   * Requiring `winston-mongodb` will expose
   * `winston.transports.MongoDB`
   */
  require('winston-mongodb');

  winston.add(winston.transports.MongoDB, options);
```

The MongoDB transport takes the following options. 'db' is required:

* __level:__ Level of messages that this transport should log, defaults to
'info'.
* __silent:__ Boolean flag indicating whether to suppress output, defaults to
false.
* __db:__ MongoDB connection uri, pre-connected db object or promise object
which will be resolved with pre-connected db object.
* __options:__ MongoDB connection parameters (optional, defaults to
`{poolSize: 2, autoReconnect: true}`).
* __collection__: The name of the collection you want to store log messages in,
defaults to 'log'.
* __storeHost:__ Boolean indicating if you want to store machine hostname in
logs entry, if set to true it populates MongoDB entry with 'hostname' field,
which stores os.hostname() value.
* __label:__ Label stored with entry object if defined.
* __name:__ Transport instance identifier. Useful if you need to create multiple
MongoDB transports.
* __capped:__ In case this property is true, winston-mongodb will try to create
new log collection as capped, defaults to false.
* __cappedSize:__ Size of logs capped collection in bytes, defaults to 10000000.
* __cappedMax:__ Size of logs capped collection in number of documents.
* __tryReconnect:__ Will try to reconnect to the database in case of fail during
initialization. Works only if __db__ is a string. Defaults to false.
* __decolorize:__ Will remove color attributes from the log entry message,
defaults to false.
* __expireAfterSeconds:__ Seconds before the entry is removed. Works only if __capped__ is not set.

*Metadata:* Logged as a native JSON object in 'meta' property.

*Logging unhandled exceptions:* For logging unhandled exceptions specify
winston-mongodb as `handleExceptions` logger according to winston documentation.

## Querying and streaming logs

Besides supporting the main options from winston, this transport supports the
following extra options:

* __includeIds:__ Whether the returned logs should include the `_id` attribute
settled by mongodb, defaults to `false`.

## Installation

``` bash
  $ npm install winston
  $ npm install winston-mongodb
```

## [Changelog](https://github.com/winstonjs/winston-mongodb/releases)

#### Author: [Charlie Robbins](http://blog.nodejitsu.com)
#### Contributors: [Yurij Mikhalevich](https://github.com/39dotyt), [Kendrick Taylor](https://github.com/sktaylor), [Yosef Dinerstein](https://github.com/yosefd), [Steve Dalby](https://github.com/stevedalby)

[0]: https://github.com/flatiron/winston
