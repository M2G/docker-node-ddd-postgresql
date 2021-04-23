require('dotenv').load();
import fs from 'fs';
import path from 'path';

async function load(){
  let module = await import('./database')[ENV];

  console.log('module', module)
}

async function load2(){
  let module = await import(path.join(__dirname, 'env', ENV));

  console.log('module', module)
}

function loadDbConfig () {
  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV]
  }
  throw new Error('Database is configuration is required')
}

const ENV = process.env.NODE_ENV || 'development';

load();
load2();

const envConfig = require(path.join(__dirname, 'env', ENV));
const dbConfig = loadDbConfig();

const config = Object.assign({
  env: ENV,
  db: dbConfig
}, envConfig)

export default config;
