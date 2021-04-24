export default {
    development: {
        version: 'v1',
        host: 'db',
        user: 'docker',
        password: 'docker',
        database: 'test_db',
        port: 3306,
        dialect: "mysql",
        dialectOptions: {
          charset: 'utf8',
        }
    },
    staging: {
        version: 'v1',
        host: 'db',
        user: 'docker',
        password: 'docker',
        database: 'test_db',
        port: 3306,
        dialect: "mysql",
      dialectOptions: {
        charset: 'utf8',
      }
    },
    production: {
        version: 'v1',
        host: 'db',
        user: 'docker',
        password: 'docker',
        database: 'test_db',
        port: 3306,
        dialect: "mysql",
      dialectOptions: {
        charset: 'utf8',
      }
    },
    test: {
        version: 'v1',
        host: 'db',
        user: 'docker',
        password: 'docker',
        database: 'test_db',
        port: 3306,
        dialect: "mysql",
      dialectOptions: {
        charset: 'utf8',
      }
    }
};
