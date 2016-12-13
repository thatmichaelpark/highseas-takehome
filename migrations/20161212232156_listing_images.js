'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('listing_images', (table) => {
    table.increments();
    table.integer('listing_id')
      .notNullable()
      .references('id')
      .inTable('listings')
      .onDelete('CASCADE')
      .index();
    table.string('image_url');
    // table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('listing_images');
};
