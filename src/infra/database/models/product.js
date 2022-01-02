/*eslint-disable*/
const table = "product";
module.exports = (/** @type {{ define: (arg0: string, arg1: { product_id: { type: any; autoIncrement: boolean; primaryKey: boolean; }; product_name: { type: any; allowNull: boolean; unique: boolean; }; }, arg2: { freezeTableName: boolean; timestamps: boolean; classMethods: { associate(): void; }; }) => any; }} */ sequelize, /** @type {{ INTEGER: any; STRING: (arg0: number) => any; }} */ DataTypes) =>
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
