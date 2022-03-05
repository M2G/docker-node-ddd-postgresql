/*eslint-disable*/
const table = "city";
// const table_country = "country";

module.exports = (/** @type {{ define: (arg0: string, arg1: { city_id: { type: any; autoIncrement: boolean; primaryKey: boolean; allowNull: boolean; }; city_name: { type: any; allowNull: boolean; }; country_id: { type: any; allowNull: boolean; }; }, arg2: { freezeTableName: boolean; timestamps: boolean; classMethods: { associate: (models: any) => void; }; }) => any; }} */ sequelize, /** @type {{ INTEGER: any; STRING: (arg0: number) => any; }} */ DataTypes) => {
  //@TODO no duplicate
  /*const Country = sequelize.define(table_country, {
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
  });*/

  const City = sequelize.define(table, {
   city_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    city_name: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
    country_id: {
     type: DataTypes.INTEGER,
     allowNull: false,
    // references: { model: 'country', key: 'country_id'},
   },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: function (/** @type {any} */ models) {
        //City.hasOne(models.Country, { foreignKey: 'fk_country', foreignKeyConstraint: true });
      }
    }
  });

  // City.hasOne(Country, { foreignKey: 'fk_country', foreignKeyConstraint: true });

  return City;

}

