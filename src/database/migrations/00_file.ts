import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('imagem', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('title').notNullable();
        table.string('size').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('imagem');
}
