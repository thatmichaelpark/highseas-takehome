'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');

router.get(`/listings`, (req, res, next) => {
  const { name, city } = req.query;
  const q = `
  select blah.listing_id, address, city, names, count(image_url) as image_count
  from
    (
      select listing_id, address, city, array_agg((name, is_primary)) as names
      from
        (
          select foo.listing_id, address, city, agent_id, is_primary
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
            ) foo
          inner join
            listings_agents
          on foo.listing_id = listings_agents.listing_id

        ) bar
      inner join
        agents
      on bar.agent_id = agents.id
      group by listing_id, address, city

    ) blah
  inner join
    listing_images
  on blah.listing_id = listing_images.listing_id
  group by blah.listing_id, address, city, names
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
