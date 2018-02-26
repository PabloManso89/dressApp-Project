/**
 * @fileOverview
 * Template for Node.js Express server
 */

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('./src/server/common/logger').logger;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swagger = require('swagger-node-express');
const routes = require('./src/server/routes/index');

const port = 9999;
const host = 'localhost';
const app = express();
const subPath = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/v1', express.static(path.join(__dirname, 'swagger')));

app.use('/v1', subPath);
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'dist')));
const ourSwagger = swagger.createNew(subPath);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/* istanbul ignore next */
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({});
});

ourSwagger.configureSwaggerPaths('', 'api-docs', '');

// Set and display the application URL
const applicationUrl = `http://${host}:${port}`;
ourSwagger.configure(applicationUrl, '2.0.0');

const server = app.listen(port, host, () => {
  const serverName = `${host}:${port}`;
  const nodeString = `[Node ${process.version} ENV: ${(process.env.NODE_ENV)}]`;
  logger.info('%s Listening on: %s ', nodeString, serverName);
});

module.exports = server;
