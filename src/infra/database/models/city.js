/*eslint-disable*/


const table = "city";
//@ts-ignore
module.exports = (sequelize, DataTypes) => {
  console.log('sequelize sequelize sequelize 2', sequelize)
 return sequelize.define(table, {
   city_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    country_name: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
   country_id: {
     type: DataTypes.INTEGER,
     allowNull: false,
     references: { model: 'country', key: 'country_id'},
   },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });
};
