exports.up = function(knex, Promise) {
	return knex.schema.createTable('checkins', function(t) {
		t.increments('id').primary().notNullable();
		t.integer('user_id').notNullable().references('users.id').onDelete('CASCADE').index();
		t.integer('points').notNullable().defaultTo(0);
		t.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('checkins');
};
