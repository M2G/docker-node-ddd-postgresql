/*eslint-disable*/
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

// @ts-ignore
export default ({ config, basePath }) => {

  // console.log('config', config)

  // console.log('config', config)
  const sequelize = new Sequelize(
    "test_db",
    // process.env.DB_SCHEMA || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    // { ...config.db })
    {
      host: 'postgres',
      port: 5432,
      dialect: 'postgres'
    })

  const db = {
    sequelize,
    Sequelize,
    models: {}
  }

  const sequelizeOptions = { logging: console.log };

  const dir = path.join(basePath, './models');

  fs.readdirSync(dir)?.filter((file) =>
    (file.indexOf('.') !== 0) && (file !== "index.js") && (file.slice(-3) === '.js')
  )?.forEach((file) => {



    // const modelDir = path.join(dir, file);
    // @see https://github.com/sequelize/express-example/issues/99
    // Sequelize v5 -> v6
    // const model = sequelize.import(modelDir)
   //  const model = require(modelDir)(sequelize, DataTypes);

   // console.log('modelDir', modelDir)

    const model = require("/app/build/src/infra/database/models/product.js")(sequelize, DataTypes);

    db.models[model.name] = model;
  });

  db.models && Object.keys(db.models)?.forEach((key) => {
    if ('associate' in db.models[key]) {
      db.models[key].associate(db.models)
    }
  });

  sequelize.sync(sequelizeOptions)
    .catch((err) => {
      console.log(err);
      process.exit();
    });

  return db;
}
