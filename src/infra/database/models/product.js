/*eslint-disable*/
const table = "product";
//@ts-ignore
module.exports = (sequelize, DataTypes) =>
  sequelize.define(table, {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });
