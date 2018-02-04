module.exports = {
    test: {
        client: 'pg',
        connection: {
            host:     process.env.DB_HOST,
            user:     process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: __dirname + '/server/db/migrations'
        },
        seeds: {
            directory: __dirname + '/server/db/seeds'
        }
    },
    development: {
        client: 'pg',
        connection: {
            host:     process.env.DB_HOST,
            user:     process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: __dirname + '/server/db/migrations'
        },
        seeds: {
            directory: __dirname + '/server/db/seeds'
        }
    }
};
