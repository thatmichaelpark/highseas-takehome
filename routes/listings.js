'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');

router.get(`/listings`, (req, res, next) => {
  const { name, city } = req.query;
  const q = `
  select listings_and_names_array.listing_id, address, city, names, count(image_url) as image_count
  from
    (
      select listing_id, address, city, array_agg((name, is_primary)) as names
      from
        (
          select listings_by_city.listing_id, address, city, agent_id, is_primary
          from
            (
              select listing_id, address, city
              from
              (
                select listing_id
                from listings_agents
                where agent_id = (select id from agents where name = '${name}')
              ) agent_listings
              inner join
                listings
              on agent_listings.listing_id = listings.id
              where listings.city = '${city}'
            ) listings_by_city
          inner join
            listings_agents
          on listings_by_city.listing_id = listings_agents.listing_id

        ) listings_with_agents
      inner join
        agents
      on listings_with_agents.agent_id = agents.id
      group by listing_id, address, city

    ) listings_and_names_array
  inner join
    listing_images
  on listings_and_names_array.listing_id = listing_images.listing_id
  group by listings_and_names_array.listing_id, address, city, names
  `;

  knex.raw(q)
  .then(results => {
    res.send(results.rows.map((r => {
      const { listing_id, address, city, names } = r;
      const image_count = Number(r.image_count);
      const result = [];
      const re = /[\\"]*([\w\s]+)[\\"]*,(\w)/g;
      let x;

      while ((x = re.exec(names)) !== null) {
        result.push({
          name: x[1],
          isPrimary: x[2] == 't'
        });
      }
      result.sort(e => e.isPrimary ? 0 : 1); // sort primary to the front
      return {
        listing_id,
        address,
        city,
        image_count,
        agent1: result[0],
        agent2: result[1]
      };
    })));
  })
  .catch(err => console.log(err));
});

module.exports = router;
