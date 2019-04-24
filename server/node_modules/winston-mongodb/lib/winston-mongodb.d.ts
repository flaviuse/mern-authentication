// Type definitions for winston-mongodb
// Project: https://github.com/winstonjs/winston-mongodb
// Definitions by: miton18 <https://github.com/miton18>, blove <https://github.com/blove>,
// Balazs Mocsai <https://github.com/mbale>

import { TransportInstance, Transports, TransportOptions } from "winston";
import { WinstonMongoDBTransports } from 'winston-mongodb';

declare module 'winston' {
    /**
     * Extending transport
     * 
     * @export
     * @interface Transports
     * @extends {WinstonMongoDBTransports}
     */
    export interface Transports extends WinstonMongoDBTransports {}
}

declare module 'winston-mongodb' {
    export interface MongoDBTransportInstance extends TransportInstance {
        new (options: MongoDBConnectionOptions) : MongoDBTransportInstance;
        query: (callback: Function, options?: any) => Promise<any>;
    }

    export interface WinstonMongoDBTransports {
        MongoDB: MongoDBTransportInstance;
    }

    /**
     * Options for transport
     * 
     * @export
     * @interface MongoDBConnectionOptions
     */
    export interface MongoDBConnectionOptions {
       /**
        * Level of messages that this transport should log, defaults to 'info'.
        * 
        * @type {string}
        * @memberof MongoDBConnectionOptions
        */
       level?: string;
       /**
        * Boolean flag indicating whether to suppress output, defaults to false.
        * 
        * @type {boolean}
        * @memberof MongoDBConnectionOptions
        */
       silent?: boolean;
       /**
        * MongoDB connection uri, pre-connected db object or promise object which will be resolved with pre-connected db object.
        * 
        * @type {(string | Promise<any>)}
        * @memberof MongoDBConnectionOptions
        */
       db: string | Promise<any>;
       /**
        * MongoDB connection parameters (optional, defaults to {poolSize: 2, autoReconnect: true}).
        * 
        * @type {*}
        * @memberof MongoDBConnectionOptions
        */
       options?: any;
       /**
        * The name of the collection you want to store log messages in, defaults to 'log'.
        * 
        * @type {string}
        * @memberof MongoDBConnectionOptions
        */
       collection?: string;
       /**
        * Boolean indicating if you want to store machine hostname in logs entry, if set to true it populates MongoDB entry with 'hostname' field, which stores os.hostname() value.
        * 
        * @type {boolean}
        * @memberof MongoDBConnectionOptions
        */
       storeHost?: boolean;
       /**
        * Label stored with entry object if defined.
        * 
        * @type {string}
        * @memberof MongoDBConnectionOptions
        */
       label?: string;
       /**
        * Transport instance identifier. Useful if you need to create multiple MongoDB transports.
        * 
        * @type {string}
        * @memberof MongoDBConnectionOptions
        */
       name?: string;
       /**
        * In case this property is true, winston-mongodb will try to create new log collection as capped, defaults to false.
        * 
        * @type {boolean}
        * @memberof MongoDBConnectionOptions
        */
       capped?: boolean;
       /**
        * Size of logs capped collection in bytes, defaults to 10000000.
        * 
        * @type {number}
        * @memberof MongoDBConnectionOptions
        */
       cappedSize?: number;
       /**
        * Size of logs capped collection in number of documents.
        * 
        * @type {number}
        * @memberof MongoDBConnectionOptions
        */
       cappedMax?: number;
       /**
        * Will try to reconnect to the database in case of fail during initialization. Works only if db is a string. Defaults to false.
        * 
        * @type {boolean}
        * @memberof MongoDBConnectionOptions
        */
       tryReconnect?: boolean;
       /**
        * Will remove color attributes from the log entry message, defaults to false.
        * 
        * @type {boolean}
        * @memberof MongoDBConnectionOptions
        */
       decolorize?: boolean;
       /**
        * Seconds before the entry is removed. Works only if capped is not set.
        * 
        * @type {number}
        * @memberof MongoDBConnectionOptions
        */
       expireAfterSeconds?: number;
    }
}
