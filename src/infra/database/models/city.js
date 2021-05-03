/*eslint-disable*/
import Country from './country';

const table = "city";
//@ts-ignore
module.exports = (sequelize, DataTypes) => {
 const City = sequelize.define(table, {
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
     allowNull: false
   },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });

  City.belongsTo(Country(), { foreignKey: 'fk_country' });

  return City;

};
