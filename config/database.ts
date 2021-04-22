module.exports = {
  development: {
    version: 'v1',
    url: process.env.DATABASE_URL,
    host: 'db',
    user: 'docker',
    password: 'docker',
    database: 'test_db',
    port: 3306,
    dialect: "mysql"
  },
  test: {
    'url': process.env.DATABASE_URL_TEST
  },
}
