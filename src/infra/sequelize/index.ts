/*eslint-disable*/
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

// @ts-ignore
export default ({ config, basePath }) => {
  // console.log('config', config)
  const sequelize = new Sequelize(
    process.env.DB_SCHEMA || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    { ...config.db })

  const db = {
    sequelize,
    Sequelize,
    models: {}
  }

  const dir = path.join(basePath, './models');

  fs.readdirSync(dir)?.filter((file) =>
    (file.indexOf('.') !== 0) && (file !== "index.js") && (file.slice(-3) === '.js')
  )?.forEach((file) => {

      console.log('file', file)

    const modelDir = path.join(dir, file);
    // @see https://github.com/sequelize/express-example/issues/99
    // Sequelize v5 -> v6
    // const model = sequelize.import(modelDir)
    const model = require(modelDir)(sequelize, DataTypes);

    db.models[model.name] = model;
  });

  db.models && Object.keys(db.models)?.forEach((key) => {
    if ('associate' in db.models[key]) {
      db.models[key].associate(db.models)
    }
  });

  return db;
}
