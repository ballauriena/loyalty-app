module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/loyalty_app_test',
    migrations: {
      directory: __dirname + '/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/server/db/seeds'
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/loyalty_app',
    migrations: {
      directory: __dirname + '/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/server/db/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DB_CONNECTION_STRING,
    migrations: {
      directory: __dirname + '/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/server/db/seeds'
    }
  }
};
