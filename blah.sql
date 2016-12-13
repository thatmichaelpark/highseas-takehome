select blah.listing_id, address, city, names, count(image_url)
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
              where agent_id = (select id from agents where name = 'barb')
            ) agent_listings
            inner join
              listings
            on agent_listings.listing_id = listings.id
            where listings.city = 'portland'
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

;
