const merchantsData = require('../../../data/merchants');
const productsData = require('../../../data/products');

exports.seed = function(knex, Promise) {
  return knex('products').del()
    .then(() => {
      return knex('merchants').del();
    })
    .then(() => {
      return knex('merchants').insert(merchantsData);
    })
    .then(() => {
      let productPromises = [];
      productsData.forEach((product) => {
        let merchant = product.merchant;
        productPromises.push(createProduct(knex, product, merchant));
      });

      return Promise.all(productPromises);
    });
};

const createProduct = (knex, product, merchant) => {
  return knex('merchants').where('name', merchant).first()
  .then((merchantRecord) => {
    return knex('products').insert({
      name: product.name,
      price: product.price,
      merchant_id: merchantRecord.id
    });
  });
};
