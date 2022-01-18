/*eslint-disable*/
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

const { DB_FORCE_RESTART } = process.env;

export default ({ config, basePath }: any) => {

   /*const sequelize = new Sequelize(
    process.env.POSTGRES_DB || 'test_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    { ...config.db })*/

     const sequelize = new Sequelize(
     'test_db_test',
     'postgres',
     'postgres',
       { ...config.db });

  const db = {
    sequelize,
    Sequelize,
    models: {}
  }

  const sequelizeOptions: {
    logging: Function;
    force: boolean | undefined;
  } = {
    force: undefined,
    logging: console.log,
  };

  const dir = path.join(basePath, './models');

  fs.readdirSync(dir)?.filter((file) =>
    (file.indexOf('.') !== 0) && (file !== "index.js") && (file.slice(-3) === '.js')
  )?.forEach((file) => {

    const modelDir = path.join(dir, file);
    // @see https://github.com/sequelize/express-example/issues/99
    // Sequelize v5 -> v6
    // const model = sequelize.import(modelDir);
    const model = require(modelDir)(sequelize, DataTypes);

    db.models[model.name] = model;

  });

  db.models && Object.keys(db.models)?.forEach((key) => {
    if ('associate' in db.models[key]) {
      db.models[key].associate(db.models)
    }
  });

  // Removes all tables and recreates them (only available if env is not in production)
  if (
    DB_FORCE_RESTART === 'true' &&
    process.env.ENV !== 'production'
  ) {
    sequelizeOptions.force = true;
  }

  sequelize.sync(sequelizeOptions as object)
    .catch((err) => {
      console.log(err);
      //process.exit();
    });

  return db;
}
