exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(t) {
        t.increments('id').primary().notNullable();
        t.string('first_name').notNullable();
        t.string('last_name').notNullable();
        t.string('email').notNullable().unique();
        t.string('phone').notNullable().unique();
        t.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
