'use strict';

const { NLISTINGS, NAGENTS, NLISTINGS_AGENTS, randi } = require('../utils');
const map = new Map();
const data = Array(NLISTINGS_AGENTS).fill().map(() => {
  let listing_id;
  let agent_id;
  do {
    listing_id = randi(NLISTINGS) + 1;
    agent_id = randi(NAGENTS) + 1;
  } while (map.get(`(${listing_id}, ${agent_id})`));
  map.set(`(${listing_id}, ${agent_id})`, true);
  return {
    listing_id,
    agent_id,
    is_primary: Math.random() < 0.5
  };
});

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('listings_agents').del()
    .then(() =>
      knex('listings_agents')
        .insert(data)
        .then(() =>
          knex.raw(
            "SELECT setval('listings_agents_id_seq', (SELECT MAX(id) FROM listings_agents));"
          )
        )
    );
};
