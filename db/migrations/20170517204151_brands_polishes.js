
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('brands', (table) => {
  		table.increments('id').primary();
  		table.string('name');
  	}),

  	knex.schema.createTable('polishes', (table) => {
  		table.increments('id').primary();
  		table.string('name');
  		table.string('price');
  		table.string('description');
  		table.string('rating');
  		table.integer('brand_id')
  			.references('id')
  			.inTable('brands');
  	})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('polishes'),
      knex.schema.dropTable('brands')
  ])
};
