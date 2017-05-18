const brandsData = require('../../../data/brands');
const polishesData = require('../../../data/polishes');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('polishes').del()
    .then(() => {
      return knex('brands').del()
      .then(() => {
        // Insert brands
        return knex('brands').insert(brandsData)
        .then(() => {
          // Insert polishes with brand foreign key
          var polishPromises = [];
          polishesData.forEach((polish) => {
            let brand = polish.brand;
            polishPromises.push(createPolish(knex, polish, brand))
          });

          return Promise.all(polishPromises);
        });
      });
    });
};

const createPolish = (knex, polish, brand) => {
  return knex('brands').where('name', brand).first()
  .then((brandRecord) => {
    return knex('polishes').insert({
      name: polish.name,
      price: polish.price,
      description: polish.description,
      rating: polish.rating,
      brand_id: brandRecord.id
    })
  });
};
