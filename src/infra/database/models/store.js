/*eslint-disable*/
const City = require('./city');

const table = "store";
//@ts-ignore
module.exports = (sequelize, DataTypes) => {
 const Store = sequelize.define(table, {
   store_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
   name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
   city_id: {
     type: DataTypes.INTEGER,
     allowNull: false,
     references: { model: 'city', key: 'city_id'},
   },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });

  Store.hasMany(City(), { foreignKey: 'fk_city', foreignKeyConstraint: true });

  return Store;

};
