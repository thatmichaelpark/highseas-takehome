'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('listings', (table) => {
    table.increments();
    table.string('address');
    table.string('city');
    // table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('listings');
};
