
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('merchants', (table) => {
  		table.increments('id').primary();
  		table.string('name');
  	}),

  	knex.schema.createTable('products', (table) => {
  		table.increments('id').primary();
  		table.string('name');
  		table.integer('price');
  		table.integer('merchant_id').unsigned()
  			.references('merchants.id');
  	})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('products'),
      knex.schema.dropTable('merchants')
  ])
};
