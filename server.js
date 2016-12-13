'use strict';

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('dev'));

const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const members = require('./routes/listings');
app.use('/api', members);

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
  else if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error('error:', err);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port);
});

module.exports = app;
