exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function(table) {
        table.increments();
        table.string('first_name').defaultTo('').notNullable();
        table.string('last_name').defaultTo('').notNullable();
        table.string('email').unique().notNullable();
        table.string('hashed_password', 60).notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
