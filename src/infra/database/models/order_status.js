/*eslint-disable*/
const Sale = require('./sale');
const Status = require('./status_name');

const table = "order_status";
//@ts-ignore
module.exports = (sequelize, DataTypes) => {
 const OrderStatus = sequelize.define(table, {
   order_status_id: {
      type: DataTypes.STRING(200),
      primaryKey: true,
      allowNull: false
    },
   update_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
   sale_id: {
     type: DataTypes.STRING(200),
     allowNull: false,
     references: { model: 'sale', key: 'sale_id'},
   },
   status_name_id: {
     type: DataTypes.INTEGER,
     allowNull: false,
     references: { model: 'status_name', key: 'status_name_id'},
   },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });

  OrderStatus.hasOne(Sale(), { foreignKey: 'fk_sale', foreignKeyConstraint: true });
  OrderStatus.hasOne(Status(), { foreignKey: 'fk_status_name', foreignKeyConstraint: true });

  return OrderStatus;

};
