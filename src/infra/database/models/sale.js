/*eslint-disable*/
//const Store = require('./store');
//const Product = require('./product');
//const User = require('./users');

const table = "sale";
//@ts-ignore
module.exports = (sequelize, DataTypes) =>
  sequelize.define(table, {
   sale_id: {
      type: DataTypes.STRING(200),
      primaryKey: true,
      allowNull: false
    },
   amount: {
      type: DataTypes.DOUBLE(20,3),
      allowNull: false
    },
   date_sale: {
     type: DataTypes.DATE,
     allowNull: false
   },
   product_id: {
     type: DataTypes.INTEGER,
     allowNull: false,
     references: { model: 'product', key: 'product_id'},
   },
   user_id: {
     type: DataTypes.INTEGER,
     allowNull: false,
     references: { model: 'users', key: 'product_id'},
   },
   store_id: {
     type: DataTypes.INTEGER,
     allowNull: false,
     references: { model: 'store', key: 'store_id'},
   },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });

 /*
  Sale.hasMany(Product(), { foreignKey: 'fk_product', foreignKeyConstraint: true });
  Sale.hasMany(User(), { foreignKey: 'fk_user', foreignKeyConstraint: true });
  Sale.hasMany(Store(), { foreignKey: 'fk_store', foreignKeyConstraint: true });

  return Sale;
*/

