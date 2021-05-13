/*eslint-disable*/
// const City = require('./city');

const table = "store";
//@ts-ignore
module.exports = (sequelize, DataTypes) => {
  //@TODO rewrite duplicate
  const Country = sequelize.define(table, {
    country_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    country_name: {
      type: DataTypes.STRING(450),
      allowNull: false
    },

  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate () {}
    }
  });


  const City = sequelize.define(table, {
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

City.belongsTo(Country, { foreignKey: 'fk_country', foreignKeyConstraint: true });

return City;

}

