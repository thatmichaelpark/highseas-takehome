'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/highseas_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/highseas_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
