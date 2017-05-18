const brandsData = require('../../../data/brands');
const polishesData = require('../../../data/polishes');

exports.seed = function(knex, Promise) {
  return knex('polishes').del()
    .then(() => {
      return knex('brands').del()
    })
    .then(() => {
      return knex('brands').insert(brandsData)
    })
    .then(() => {
      var polishPromises = [];
      polishesData.forEach((polish) => {
        let brand = polish.brand;
        polishPromises.push(createPolish(knex, polish, brand))
      });

      return Promise.all(polishPromises);
    })
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
