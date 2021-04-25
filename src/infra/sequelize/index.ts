/*eslint-disable*/
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

export default ({ config, basePath }: any) => {
  // console.log('config', config)
  const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || '',
    process.env.MYSQL_USER || '',
    process.env.MYSQL_PASSWORD || '',
    { ...config.db })

  const db = {
    sequelize,
    Sequelize,
    models: {}
  }

  const dir: string = path.join(basePath, './models');
  fs.readdirSync(dir)
    .filter((file: string) => {
      return (file.indexOf('.') !== 0) && (file !== "index.js") && (file.slice(-3) === '.js');
    })
    .forEach((file: string) => {
    const modelDir = path.join(dir, file);
    //@see https://github.com/sequelize/express-example/issues/99
    // Sequelize v5 -> v6
    // const model = sequelize.import(modelDir)
    const model = require(modelDir)(sequelize, DataTypes)

    console.log('model', model)

    db.models[model.name] = model;
  });

  Object.keys(db.models).forEach((key) => {
    if ('associate' in db.models[key]) {
      db.models[key].associate(db.models)
    }
  });

  return db;
}
