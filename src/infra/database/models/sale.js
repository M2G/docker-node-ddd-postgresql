/*eslint-disable*/
const City = require('./city');

const table = "sale";
//@ts-ignore
module.exports = (sequelize, DataTypes) => {
 const Store = sequelize.define(table, {
   sale_id: {
      type: DataTypes.STRING(200),
      primaryKey: true,
      allowNull: false
    },
   amount: {
      type: DataTypes.REAL(20,3),
      allowNull: false
    },
   date_sale: {
     type: DataTypes.DATE,
     allowNull: false
   },
   product_id: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
   user_id: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
   store_id: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });

  Store.hasMany(City(), { foreignKey: 'fk_city', foreignKeyConstraint: true });

  return City;

};
