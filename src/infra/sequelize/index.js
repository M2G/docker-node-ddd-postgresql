/*eslint-disable*/
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// @ts-ignore
module.exports = async ({ config, basePath }) => {
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

  await fs.readdirSync(dir)?.filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== "index.js") && (file.slice(-3) === '.js');
    })?.forEach((file) => {

      console.log('file', file)

    const modelDir = path.join(dir, file);
    //@see https://github.com/sequelize/express-example/issues/99
    // Sequelize v5 -> v6
     // const model = sequelize.import(modelDir)
    const model = require(modelDir)(sequelize, DataTypes);

    db.models[model.name] = model;
  });

  Object.keys(db.models)?.forEach((key) => {
    if ('associate' in db.models[key]) {
      db.models[key].associate(db.models)
    }
  });

  return db;
}
