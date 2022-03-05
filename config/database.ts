export default {
    development: {
        version: 'v1',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5433,
        dialect: 'postgres',
        logging: console.log,
    },
    staging: {
        version: 'v1',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5433,
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true
          }
        }
    },
    production: {
        version: 'v1',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5433,
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true
          }
        }
    },
    test: {
        version: 'v1',
        host: 'localhost',
        port: 5433,
        dialect: 'postgres',
        logging: console.log,
    }
};
