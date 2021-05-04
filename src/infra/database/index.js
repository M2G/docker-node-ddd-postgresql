/* eslint-disable */
const sequelize = require('../sequelize');

// @ts-ignore
module.exports = ({ logger, config }) => {
  const { db = null } = config;
  if (!db) {
    logger.error('Database config file log not found, disabling database.');
    return false;
  }

  return sequelize({ config, basePath: __dirname });
};
