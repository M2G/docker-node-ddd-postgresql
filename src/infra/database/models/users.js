/*eslint-disable*/

const table = "users";
//@ts-ignore
module.exports = (sequelize, DataTypes) =>
  sequelize.define(table, {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
   name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });
