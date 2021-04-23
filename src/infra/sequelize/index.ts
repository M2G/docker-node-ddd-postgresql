/*eslint-disable*/
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

export default ({ config, basePath }: any) => {
  // console.log('config', config)
  // @ts-ignore
  // @ts-ignore
  const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || '',
    process.env.MYSQL_USER || '',
    process.env.MYSQL_PASSWORD || '',
    { ...config.db }
)

  const db = {
    sequelize,
    Sequelize,
    models: {}
  }

  const dir = path.join(basePath, './models');
  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file)
    const model = sequelize.import(modelDir)
    db.models[model.name] = model
  })

  Object.keys(db.models).forEach((key) => {
    if ('associate' in db.models[key]) {
      db.models[key].associate(db.models)
    }
  })

  return db
}
