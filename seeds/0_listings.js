'use strict';

const { NLISTINGS, randi, randword } = require('../utils');

const cities = ['seattle', 'portland', 'vancouver'];
const data = Array(NLISTINGS).fill().map(() => {
  return {
    address: `${randi(1000)} ${randword()} st`,
    city: cities[randi(cities.length)]
  }
});

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('listings').del()
    .then(() =>
      knex('listings')
        .insert(data)
        .then(() =>
          knex.raw(
            "SELECT setval('listings_id_seq', (SELECT MAX(id) FROM listings));"
          )
        )
    );
};
