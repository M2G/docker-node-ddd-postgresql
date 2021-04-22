require('dotenv').load();

import fs from 'fs';
import path from 'path';

function loadDbConfig () {
  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV]
  }

  throw new Error('Database is configuration is required')
}

const ENV = process.env.NODE_ENV || 'development'

const envConfig = require(path.join(__dirname, 'env', ENV))
const dbConfig = loadDbConfig()
const config = Object.assign({
  env: ENV,
  db: dbConfig
}, envConfig)

export default config;
