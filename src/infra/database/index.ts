import sequelize from '../sequelize';

export default ({ logger, config }: any) => {
  if (!config.db) {
    logger.error('Database config file log not found, disabling database.');
    return false;
  }

  return sequelize({ basePath: __dirname, config });
};
