/**
 * Created by tleppako on 28/11/2016.
 */

'use strict';

/* eslint no-console: "off" */ // we need to use console.log as logger is not initialized yet.

const bunyan = require('bunyan');
const format = require('bunyan-format');
const RotatingFileStream = require('bunyan-rotating-file-stream');
const fs = require('fs');

const outFormat = format({
  outputMode: 'long',
  color: true,
});

// Add logging directory if it does not exist.
const dir = './log';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log(`Created logging dir: ${dir}`);
}

const req = 'req';
const err = 'err';

const streamConfig = () => {
  if (process.env.NODE_ENV === 'test') {
    return {
      streams: [
        {
          level: 'fatal',
          stream: outFormat,
        },
      ],
    };
  }

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
    return {
      streams: [
        {
          level: 'debug',
          stream: outFormat,
        },
      ],
    };
  }

  /* istanbul ignore next */
  return {
    streams: [
      {
        level: 'info',
        stream: outFormat,
      },
      {
        level: 'info',
        stream: new RotatingFileStream({
          path: './log/findcmr.%d-%m-%Y.log',
          period: '1w',
          totalFiles: 1,
          rotateExisting: false,
          threshold: '25m',
          totalSize: '50m',
          gzip: false,
        }),
      },
    ],
  };
};

const logger = bunyan.createLogger({
  name: 'stdOut',                          // logger name
  serializers: {
    req: bunyan.stdSerializers[req],     // standard bunyan req serializer
    err: bunyan.stdSerializers[err], // standard bunyan error serializer
  },
  streams: streamConfig().streams,
});

module.exports = {
  logger,
};
