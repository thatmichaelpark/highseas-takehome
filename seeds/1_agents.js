'use strict';

const data = [
  {
    name: 'andy'
  }, {
    name: 'barb'
  }, {
    name: 'charlie'
  }, {
    name: 'david'
  }, {
    name: 'eddie'
  }, {
    name: 'fran'
  }
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('agents').del()
    .then(() =>
      knex('agents')
        .insert(data)
        .then(() =>
          knex.raw(
            "SELECT setval('agents_id_seq', (SELECT MAX(id) FROM agents));"
          )
        )
    );
};
