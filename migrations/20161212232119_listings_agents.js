'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('listings_agents', (table) => {
    table.increments();
    table.integer('listing_id')
      .notNullable()
      .references('id')
      .inTable('listings')
      .onDelete('CASCADE')
      .index();
    table.integer('agent_id')
      .notNullable()
      .references('id')
      .inTable('agents')
      .onDelete('CASCADE')
      .index();
    table.boolean('is_primary');
    // table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('listings_agents');
};
