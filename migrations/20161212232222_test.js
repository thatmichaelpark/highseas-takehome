'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('test', (table) => {
    table.increments();
    table.integer('listing_id');
    table.string('name');
    table.boolean('is_primary');
    // table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('test');
};
