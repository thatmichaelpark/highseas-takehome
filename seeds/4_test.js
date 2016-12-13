'use strict';

const data = [
  { listing_id: 5, name: 'aaa', is_primary: true },
  { listing_id: 5, name: 'bbb', is_primary: true },
  { listing_id: 3, name: 'bbb', is_primary: true },
  { listing_id: 4, name: 'ccc', is_primary: false },
  { listing_id: 5, name: 'ccc', is_primary: false },
  { listing_id: 3, name: 'ccc', is_primary: false },
]
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('test').del()
    .then(() =>
      knex('test')
        .insert(data)
        .then(() =>
          knex.raw(
            "SELECT setval('test_id_seq', (SELECT MAX(id) FROM test));"
          )
        )
    );
};
