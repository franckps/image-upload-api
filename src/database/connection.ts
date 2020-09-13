import knex from 'knex'
import path from 'path'
import Knex from 'knex';

const db:Knex = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true
});

export default db