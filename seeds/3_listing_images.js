'use strict';

const { NLISTINGS, NLISTING_IMAGES, randi, randword } = require('../utils');
const data = Array(NLISTING_IMAGES).fill().map(() => {
  const id = randi(NLISTINGS) + 1;
  return {
    listing_id: id,
    image_url: `img/${id}_${randword()}.jpg`
  }
});

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('listing_images').del()
    .then(() =>
      knex('listing_images')
        .insert(data)
        .then(() =>
          knex.raw(
            "SELECT setval('listing_images_id_seq', (SELECT MAX(id) FROM listing_images));"
          )
        )
    );
};
